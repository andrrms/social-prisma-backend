import { prisma } from '../../server';
import { AppError } from '../../errors/AppError';

export default async function listUserArticlesService(
  username: string,
  page = 0
) {
  const user = await prisma.user.findUnique({
    where: {
      username,
    },
  });

  if (!user) {
    throw new AppError('User not found', 404);
  }

  const articles = await prisma.post.findMany({
    where: {
      authorId: user.id,
    },
    include: {
      author: {
        select: {
          id: true,
          name: true,
          username: true,
          avatarUrl: true,
          isVerified: true,
          permission: true,
        },
      },
    },
    take: 10,
    skip: page * 10,
  });

  return articles;
}
