import { Router } from 'express';

import ensureAuthMiddleware from '../middlewares/ensureAuth.middleware';
import {
  createFollowController,
  removeFollowController,
} from '../controllers/follow.controllers';

const interactionRouter = Router();

interactionRouter.post(
  '/follow/:username',
  ensureAuthMiddleware,
  createFollowController
);
interactionRouter.post(
  '/unfollow/:username',
  ensureAuthMiddleware,
  removeFollowController
);

export default interactionRouter;
