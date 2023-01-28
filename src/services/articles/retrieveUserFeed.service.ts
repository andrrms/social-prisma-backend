/* eslint-disable @typescript-eslint/no-unused-vars */
import { prisma } from '../../server';

export default async function listUserArticlesService(id: string, page = 0) {
  const articles = await prisma.post.findMany({
    where: {
      isActive: true,
      OR: [
        { authorId: id },
        {
          author: {
            following: {
              some: {
                followerId: id,
                targetId: {
                  not: id,
                },
              },
            },
            id: {
              not: id,
            },
          },
        },
      ],
    },
    include: {
      _count: {
        select: {
          likes: true,
          shares: true,
          repliedBy: true,
        },
      },
      author: {
        select: {
          id: true,
          name: true,
          username: true,
          avatarUrl: true,
          isVerified: true,
          permission: true,
          biography: true,
          _count: {
            select: {
              followers: true,
              following: true,
            },
          },
        },
      },
      likes: {
        where: {
          userId: id,
        },
        select: {
          userId: true,
          postId: true,
        },
      },
    },
    orderBy: {
      createdAt: 'desc',
    },
    /* take: 10,
    skip: page * 10, */
  });

  const finalArticles = articles.map((article) => {
    const {
      _count,
      author: { _count: _authorCount, ...authorRest },
      authorId: _,
      isActive,
      likes,
      ...rest
    } = article;

    return {
      ...rest,
      likes: _count.likes,
      shares: _count.shares,
      replies: _count.repliedBy,
      author: {
        ...authorRest,
        followersCount: _authorCount.following,
        followingCount: _authorCount.followers,
      },
      hasLiked: likes.length > 0,
    };
  });

  return finalArticles;
}
