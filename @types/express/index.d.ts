import * as express from 'express';
import { UserPermission } from '@prisma/client';

declare global {
  namespace Express {
    interface Request {
      user: {
        id: string;
        username: string;
        permission: UserPermission;
      };
    }
  }
}
