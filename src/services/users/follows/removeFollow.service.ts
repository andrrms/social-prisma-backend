import { prisma } from '../../../server';
import { AppError } from '../../../errors/AppError';

export default async function removeFollowService(
  targetUsername: string,
  followerId: string
) {
  const foundTarget = await prisma.user.findUnique({
    where: { username: targetUsername },
  });
  if (!foundTarget) {
    throw new AppError(
      // eslint-disable-next-line quotes
      "Attempt to unfollow didn't worked because user doesn't exists",
      404
    );
  }

  const follow = await prisma.userFollow.delete({
    where: {
      followerId_targetId: {
        followerId,
        targetId: foundTarget.id,
      },
    },
  });

  return follow;
}
