import { hash } from 'bcryptjs';

import { prisma } from '../../server';
import cleanupUserPassword from '../../utils/cleanupUserPassword.util';
import { AppError } from '../../errors/AppError';
import {
  UserRequest,
  UserWithoutPassword,
} from '../../interfaces/user.interfaces';
import { Fields } from '../../interfaces/util.interfaces';

export const USER_REQUIRED_FIELDS: Fields<UserRequest> = [
  'name',
  'username',
  'email',
  'password',
  'birthDate',
];
export default async function createUserService({
  name,
  username,
  email,
  password,
  birthDate,
  avatarUrl,
}: UserRequest): Promise<UserWithoutPassword> {
  if (
    await prisma.user.findFirst({
      where: {
        OR: [{ username }, { email }],
      },
    })
  )
    throw new AppError(
      'Já existe um usuário com este email ou nome de usuário',
      409
    );

  if (username.length < 5)
    throw new AppError(
      'O nome de usuário deve ter pelo menos 5 caracteres',
      400
    );

  const hashedPassword = await hash(password, 8);
  const DEFAULT_AVATAR =
    'https://abs.twimg.com/sticky/default_profile_images/default_profile_400x400.png';

  const user = await prisma.user.create({
    data: {
      name,
      username,
      email,
      password: hashedPassword,
      birthDate: new Date(birthDate),
      avatarUrl: avatarUrl || DEFAULT_AVATAR,
    },
  });

  /* const birdyDefault = await prisma.user.findFirstOrThrow({
    where: {
      username: 'bluebird',
    },
  });

  await prisma.userFollow.create({
    data: {
      followerId: user.id,
      targetId: birdyDefault.id,
    },
  }); */

  if (process.env.DEBUG === 'true') {
    console.log(`${user.name} (${user.username}) criou uma conta!`);
  }

  return cleanupUserPassword(user);
}
