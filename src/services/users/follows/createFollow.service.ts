import { prisma } from '../../../server';
import { AppError } from '../../../errors/AppError';

export default async function createFollowService(
  targetUsername: string,
  followerId: string
) {
  const targetUser = await prisma.user.findUnique({
    where: {
      username: targetUsername,
    },
  });

  if (!targetUser) {
    throw new AppError('User not found', 404);
  }

  if (targetUser.id === followerId) {
    throw new AppError('You cannot follow yourself', 400);
  }

  if (
    await prisma.userFollow.findUnique({
      where: {
        followerId_targetId: {
          followerId: followerId,
          targetId: targetUser.id,
        },
      },
    })
  ) {
    throw new AppError('You already follow this user', 400);
  }

  const follow = await prisma.userFollow.create({
    data: {
      followerId: followerId,
      targetId: targetUser.id,
    },
  });

  return follow;
}
