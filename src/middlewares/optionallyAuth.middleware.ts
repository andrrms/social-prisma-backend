/* eslint-disable @typescript-eslint/no-unused-vars */
import 'dotenv/config';
import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';

import { AppError } from '../errors/AppError';

const optionallyAuthMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (!req.headers.authorization) return next();
  const [_, token] = req.headers.authorization.split(' ');

  jwt.verify(
    token,
    process.env.SECRET_KEY as string,
    (err: unknown, decoded: any) => {
      // We throw an error here since token could be expired.
      // We need to alert the client so it requests a refreshed token.
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

export default optionallyAuthMiddleware;
