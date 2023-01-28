/* eslint-disable @typescript-eslint/no-unused-vars */
import { prisma } from '../../server';
import { SearchUser } from '../../interfaces/user.interfaces';

export default async function retrieveUserService(id: string, page = 0) {
  const foundUser = await prisma.user.findUniqueOrThrow({
    where: { id },
    include: {
      _count: {
        select: {
          followers: true,
          following: true,
        },
      },
    },
  });

  const {
    _count,
    email,
    password: _,
    isActive,
    updatedAt,
    ...rest
  } = foundUser;

  return {
    ...rest,
    followersCount: _count.following,
    followingCount: _count.followers,
  };
}
