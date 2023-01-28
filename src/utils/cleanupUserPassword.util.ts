/* eslint-disable @typescript-eslint/no-unused-vars */
import { User } from '@prisma/client';

import { UserWithoutPassword } from '../interfaces/user.interfaces';

export default function cleanupUserPassword<T extends User = User>(
  user: T
): UserWithoutPassword<T> {
  const { password: _, ...userWithoutPassword } = user;

  return userWithoutPassword;
}
