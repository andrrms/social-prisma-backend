import { prisma } from '../../../server';

export default async function listFollowingService(username: string, page = 0) {
  const following = await prisma.userFollow.findMany({
    where: {
      follower: {
        username,
      },
    },
    include: {
      target: {
        select: {
          id: true,
          name: true,
          username: true,
          avatarUrl: true,
        },
      },
    },
    take: 5,
    skip: page * 5,
  });

  /* return {
    page,
    nextPage: followers.length === 5 ? page + 1 : null,
    prevPage: page === 0 ? null : page - 1,
    followers: followers.map((follower) => follower.follower),
  }; */
  return following.map((follower) => follower.target);
}
