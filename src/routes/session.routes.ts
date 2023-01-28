import { Router } from 'express';

import {
  createSessionController,
  LOGIN_REQUIRED_FIELDS,
  logoutSessionController,
  refreshSessionController,
} from '../controllers/session.controllers';

import { checkRequiredBodyFields } from '../middlewares/checkRequiredFields.middleware';

const sessionRouter = Router();

sessionRouter.post(
  '/login',
  checkRequiredBodyFields(LOGIN_REQUIRED_FIELDS),
  createSessionController
);
sessionRouter.post('/logout', logoutSessionController);
sessionRouter.post('/refresh', refreshSessionController);

export default sessionRouter;
