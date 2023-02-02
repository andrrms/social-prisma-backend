/* eslint-disable @typescript-eslint/no-unused-vars */
import { AppError } from '../../errors/AppError';
import { prisma } from '../../server';

export default async function retrieveUserService(
  targetIdOrUsername: string,
  userId?: string,
  page = 0
) {
  const foundUser = await prisma.user.findFirstOrThrow({
    where: {
      OR: [{ id: targetIdOrUsername }, { username: targetIdOrUsername }],
    },
    include: {
      _count: {
        select: {
          followers: true,
          following: true,
        },
      },
    },
  });
  if (!foundUser) {
    throw new AppError('User not found', 404);
  }

  let isFollowing = false;
  if (userId) {
    if (
      await prisma.userFollow.findUnique({
        where: {
          followerId_targetId: {
            followerId: userId,
            targetId: foundUser.id,
          },
        },
      })
    )
      isFollowing = true;
  }

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
    isFollowing,
    followersCount: _count.following,
    followingCount: _count.followers,
  };
}
