import 'express-async-errors';
import express from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';

import userRouter from './routes/user.routes';
import sessionRouter from './routes/session.routes';

import { handleErrorMiddleware } from './middlewares/handleErrors.middleware';
import interactionRouter from './routes/interaction.routes';
import articleRouter from './routes/article.routes';

const app = express();

// Install early middleware
app.use(
  cors({
    origin: true,
    credentials: true,
    allowedHeaders: [
      'Content-Type',
      'Authorization',
      'X-Requested-With',
      'Accept',
      'Origin',
      'Cookie',
    ],
  }),
  cookieParser(),
  express.json()
);

// Install routes
app.use('/users', userRouter);
app.use('/session', sessionRouter);
app.use('/article', articleRouter);
app.use('/interaction', interactionRouter);

// Install late middleware
app.use(handleErrorMiddleware);

export default app;
