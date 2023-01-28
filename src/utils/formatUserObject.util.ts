/* eslint-disable @typescript-eslint/no-unused-vars */
import { FormattedUser, _UserWithCount } from '../interfaces/user.interfaces';

export default function formatUserObject(user: _UserWithCount): FormattedUser {
  const { _count, permission, isActive, createdAt, updatedAt, ...userRest } =
    user;

  const newUser = {
    ...userRest,
    followersCount: _count.following,
    followingCount: _count.followers,
  } satisfies FormattedUser;

  return newUser;
}
