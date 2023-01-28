import { prisma } from '../../../server';

export default async function listFollowersService(username: string, page = 0) {
  const followers = await prisma.userFollow.findMany({
    where: {
      target: {
        username,
      },
    },
    include: {
      follower: {
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
  return followers.map((follower) => follower.follower);
}
