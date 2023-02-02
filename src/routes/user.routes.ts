import { Router } from 'express';

import {
  createUserController,
  USER_REQUIRED_FIELDS,
  listUsersController,
  retrieveSelfController,
  retrieveUserController,
} from '../controllers/user.controllers';
import {
  listFollowersController,
  listFollowingController,
} from '../controllers/follow.controllers';

import ensureAuthMiddleware from '../middlewares/ensureAuth.middleware';
import optionallyAuthMiddleware from '../middlewares/optionallyAuth.middleware';
import { checkRequiredBodyFields } from '../middlewares/checkRequiredFields.middleware';

const userRouter = Router();

userRouter.post(
  '/register',
  checkRequiredBodyFields(USER_REQUIRED_FIELDS),
  createUserController
);
userRouter.get('/me', ensureAuthMiddleware, retrieveSelfController);
userRouter.get('/me/followers', ensureAuthMiddleware, listFollowersController);
userRouter.get('/me/following', ensureAuthMiddleware, listFollowingController);
userRouter.get('/:term', optionallyAuthMiddleware, retrieveUserController);
userRouter.get('/search/:username', ensureAuthMiddleware, listUsersController);
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
