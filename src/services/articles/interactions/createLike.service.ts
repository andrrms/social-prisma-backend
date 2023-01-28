/* eslint-disable @typescript-eslint/no-unused-vars */
import { AppError } from '../../../errors/AppError';
import { prisma } from '../../../server';

export default async function createLikeService(
  userId: string,
  postId: string
) {
  const foundLike = await prisma.postLike.findUnique({
    where: {
      postId_userId: {
        postId,
        userId,
      },
    },
  });
  if (foundLike) {
    throw new AppError(
      // eslint-disable-next-line quotes
      "Attempt to create like didn't worked because user already liked it",
      409
    );
  }

  const like = await prisma.postLike.create({
    data: {
      postId,
      userId,
    },
  });

  return like;
}
