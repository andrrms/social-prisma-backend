/* eslint-disable @typescript-eslint/no-unused-vars */
import { AppError } from '../../../errors/AppError';
import { prisma } from '../../../server';

export default async function removeRepostService(
  userId: string,
  postId: string
) {
  const repost = await prisma.postShare.delete({
    where: {
      postId_userId: {
        postId,
        userId,
      },
    },
  });
  if (!repost) {
    throw new AppError(
      // eslint-disable-next-line quotes
      "Attempt to remove repost didn't worked because user haven't reposted it",
      404
    );
  }

  return repost;
}
