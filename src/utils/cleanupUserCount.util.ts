/* eslint-disable @typescript-eslint/no-unused-vars */
import { User } from '@prisma/client';

import { FormattedUser, _UserWithCount } from '../interfaces/user.interfaces';

export default function cleanupUserCount<T extends User = User>(
  user: _UserWithCount<T>
): FormattedUser<T> {
  const { _count: _, ...userWithoutCount } = user;

  const newUser = {
    ...userWithoutCount,
    followersCount: user._count.followers,
    followingCount: user._count.following,
  };

  return newUser as FormattedUser<_UserWithCount<T>>;
}
