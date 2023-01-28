/* eslint-disable @typescript-eslint/no-unused-vars */
import 'dotenv/config';
import { NextFunction, Request, Response } from 'express';

import { AppError } from '../errors/AppError';

const handleErrorMiddleware = async (
  error: Error,
  req: Request,
  res: Response,
  _next: NextFunction
) => {
  if (process.env.DEBUG === 'true' || process.env.DEBUG) {
    console.error('[APP] Uma rota levantou o erro abaixo:\n', error);
  }
  if (error instanceof AppError) {
    return res.status(error.statusCode).json({
      message: error.message,
    });
  }
  return res.status(500).json({
    message: 'An internal error occured',
    error: process.env.NODE_ENV === 'development' ? error.message : undefined,
    stack: process.env.NODE_ENV === 'development' && error.stack,
  });
};

export { handleErrorMiddleware };
