import { Router } from 'express';

import {
  createUserController,
  USER_REQUIRED_FIELDS,
  listUsersController,
  retrieveSelfController,
} from '../controllers/user.controllers';

import ensureAuthMiddleware from '../middlewares/ensureAuth.middleware';
import { checkRequiredBodyFields } from '../middlewares/checkRequiredFields.middleware';
import {
  listFollowersController,
  listFollowingController,
} from '../controllers/follow.controllers';

const userRouter = Router();

userRouter.post(
  '/register',
  checkRequiredBodyFields(USER_REQUIRED_FIELDS),
  createUserController
);
userRouter.get('/me', ensureAuthMiddleware, retrieveSelfController);
userRouter.get('/me/followers', ensureAuthMiddleware, listFollowersController);
userRouter.get('/me/following', ensureAuthMiddleware, listFollowingController);
userRouter.get('/:username', ensureAuthMiddleware, listUsersController);
userRouter.get(
  '/:username/followers',
  ensureAuthMiddleware,
  listFollowersController
);
userRouter.get(
  '/:username/following',
  ensureAuthMiddleware,
  listFollowingController
);

export default userRouter;
