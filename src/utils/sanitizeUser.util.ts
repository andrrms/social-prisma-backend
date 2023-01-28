/* eslint-disable @typescript-eslint/no-unused-vars */
import { User } from '@prisma/client';

import { _UserWithCount } from '../interfaces/user.interfaces';

export default function sanitizeUser(user: User) {
  const {
    _count,
    permission,
    isActive,
    updatedAt,
    password,
    email,
    ...userRest
  } = user as _UserWithCount;

  return userRest;
}
