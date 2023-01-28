/* eslint-disable @typescript-eslint/no-unused-vars */
import { prisma } from '../../server';
import { SearchUser } from '../../interfaces/user.interfaces';

export default async function listUsersService(
  nameOrUsername: string,
  selfId?: string,
  page = 0
) {
  const foundUsers = await prisma.user.findMany({
    where: {
      OR: [
        {
          name: {
            contains: nameOrUsername,
            mode: 'insensitive',
          },
        },
        {
          username: {
            startsWith: nameOrUsername,
            mode: 'insensitive',
          },
        },
      ],
    },
    include: {
      _count: {
        select: {
          followers: true,
          following: true,
        },
      },
      following: {
        where: {
          followerId: selfId,
          targetId: {
            not: selfId,
          },
        },
      },
    },
    take: 5,
    skip: page * 5,
  });

  const shapedUsers = foundUsers.map((user) => {
    const {
      _count,
      email,
      password: _,
      following,
      isActive,
      createdAt,
      updatedAt,
      ...rest
    } = user;

    return {
      ...rest,
      followersCount: _count.following,
      followingCount: _count.followers,
      isFollowing: following.length > 0,
    } as SearchUser;
  });

  return shapedUsers;
}
