/* eslint-disable @typescript-eslint/no-unused-vars */
import { AppError } from '../../../errors/AppError';
import { prisma } from '../../../server';

export default async function createRepostService(
  userId: string,
  postId: string
) {
  const foundRepost = await prisma.postShare.findUnique({
    where: {
      postId_userId: {
        postId,
        userId,
      },
    },
  });
  if (foundRepost) {
    throw new AppError(
      // eslint-disable-next-line quotes
      "Attempt to repost didn't worked because user already reposted it",
      409
    );
  }

  const repost = await prisma.postShare.create({
    data: {
      postId,
      userId,
    },
  });

  return repost;
}
