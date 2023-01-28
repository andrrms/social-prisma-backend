import 'dotenv/config';
import jwt from 'jsonwebtoken';
import { compare } from 'bcryptjs';

import { prisma } from '../../server';
import { AppError } from '../../errors/AppError';
import {
  ILoginResponse,
  IUserLoginRequest,
} from '../../interfaces/session.interfaces';

export const LOGIN_REQUIRED_FIELDS = ['login', 'password'];
export default async function createSessionService({
  login,
  password,
}: IUserLoginRequest): Promise<ILoginResponse> {
  const invalidLogin = new AppError('Invalid login or password', 401);

  const foundUser = await prisma.user.findFirst({
    where: {
      OR: [{ username: login }, { email: login }],
    },
  });

  if (!foundUser) throw invalidLogin;
  const passwordsMatch = await compare(password, foundUser.password);

  if (!passwordsMatch) throw invalidLogin;
  const accessToken = jwt.sign(
    {
      username: foundUser.username,
      permission: foundUser.permission,
    },
    process.env.SECRET_KEY as string,
    {
      subject: foundUser.id,
      expiresIn: '2m',
    }
  );

  const refreshToken = jwt.sign(
    {
      username: foundUser.username,
      permission: foundUser.permission,
    },
    process.env.REFRESH_SECRET_KEY as string,
    {
      expiresIn: '1d',
    }
  );

  return { accessToken, refreshToken };
}
