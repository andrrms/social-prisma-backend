/* eslint-disable @typescript-eslint/no-unused-vars */
import { prisma } from '../../server';

import sanitizeUser from '../../utils/sanitizeUser.util';
import { AppError } from '../../errors/AppError';
import { User } from '@prisma/client';

export default async function retrieveArticleService(
  postId: string,
  selfId: string
) {
  console.log('=========wfdsfesf', postId);
  const foundArticle = await prisma.post.findFirst({
    where: {
      id: postId,
    },
    include: {
      author: {
        select: {
          id: true,
          name: true,
          username: true,
          avatarUrl: true,
          accountType: true,
          permission: true,
          biography: true,
          isOfficial: true,
          following: {
            where: {
              followerId: selfId,
            },
            select: {
              createdAt: true,
            },
          },
          _count: {
            select: {
              followers: true,
              following: true,
            },
          },
        },
      },
    },
  });
  if (!foundArticle) {
    throw new AppError('No post found', 404);
  }

  const {
    authorId: _,
    author: { following, ...authorRest },
    ...rest
  } = foundArticle;

  return {
    ...rest,
    author: {
      ...sanitizeUser(authorRest as unknown as User),
      isFollowing: following.length > 0,
    },
  };
}
