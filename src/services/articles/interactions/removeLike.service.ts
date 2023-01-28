/* eslint-disable @typescript-eslint/no-unused-vars */
import { AppError } from '../../../errors/AppError';
import { prisma } from '../../../server';

export default async function removeLikeService(
  userId: string,
  postId: string
) {
  const like = await prisma.postLike.delete({
    where: {
      postId_userId: {
        postId,
        userId,
      },
    },
  });
  if (!like) {
    throw new AppError(
      // eslint-disable-next-line quotes
      "Attempt to remove like didn't worked because user didn't liked it",
      404
    );
  }

  return like;
}
