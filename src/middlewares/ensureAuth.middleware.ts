/* eslint-disable @typescript-eslint/no-unused-vars */
import 'dotenv/config';
import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';

import { AppError } from '../errors/AppError';

const ensureAuthMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const invalidToken = new AppError(
    'User must be logged in to access this feature',
    401
  );

  if (!req.headers.authorization) throw invalidToken;
  const [_, token] = req.headers.authorization.split(' ');
  if (!token) throw invalidToken;

  jwt.verify(
    token,
    process.env.SECRET_KEY as string,
    (err: unknown, decoded: any) => {
      if (err) throw new AppError('Invalid or expired token', 401);

      req.user = {
        id: decoded.sub as string,
        username: decoded.username,
        permission: decoded.permission,
      };

      next();
    }
  );
};

export default ensureAuthMiddleware;
