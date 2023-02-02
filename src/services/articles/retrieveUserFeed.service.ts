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
        {
          author: {
            isNot: {
              id: id,
            },
          },
          shares: {
            some: {
              user: {
                following: {
                  some: {
                    followerId: id,
                  },
                },
              },
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
          accountType: true,
          permission: true,
          biography: true,
          isOfficial: true,
          following: {
            where: {
              followerId: id,
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
      likes: {
        where: {
          userId: id,
        },
        select: {
          userId: true,
          postId: true,
        },
      },
      shares: {
        where: {
          user: {
            OR: [
              {
                id: id,
              },
              {
                following: {
                  some: {
                    followerId: id,
                  },
                },
              },
            ],
          },
        },
        select: {
          user: {
            select: {
              id: true,
              name: true,
              username: true,
              biography: true,
              avatarUrl: true,
              isOfficial: true,
              accountType: true,
              following: {
                where: {
                  followerId: id,
                },
                select: {
                  createdAt: true,
                },
              },
            },
          },
          postId: true,
          createdAt: true,
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
      author: { _count: _authorCount, following, ...authorRest },
      authorId,
      isActive,
      likes,
      shares,
      ...rest
    } = article;

    const shouldRemoveArticle = shares.find(
      (share) => share.createdAt < share.user?.following[0]?.createdAt
    );
    if (shouldRemoveArticle) return;

    return {
      ...rest,
      shouldRemove: false,
      likes: _count.likes,
      shares: _count.shares,
      replies: _count.repliedBy,
      author: {
        ...authorRest,
        isFollowing: authorId === id ? undefined : following.length > 0,
        followersCount: _authorCount.following,
        followingCount: _authorCount.followers,
      },
      hasLiked: likes.length > 0,
      hasShared: !!shares.find((s) => s.user.id === id),
      shared: shares.reduce((acc, curr) => {
        if (curr.user.id === id) return acc;
        const { following, ...rest } = curr.user;
        const newUser = {
          isFollowing: following.length > 0,
          ...rest,
        };
        acc.push(newUser);
        return acc;
      }, [] as unknown[]),
    };
  });

  return finalArticles.filter(Boolean);
}
