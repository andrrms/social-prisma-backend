import { Router } from 'express';

import {
  createArticleController,
  ARTICLE_REQUIRED_FIELDS,
  listArticlesController,
  retrieveUserFeedController,
  createLikeController,
  removeLikeController,
} from '../controllers/article.controllers';

import ensureAuthMiddleware from '../middlewares/ensureAuth.middleware';
import { checkRequiredBodyFields } from '../middlewares/checkRequiredFields.middleware';

const articleRouter = Router();

articleRouter.post(
  '/new',
  checkRequiredBodyFields(ARTICLE_REQUIRED_FIELDS),
  ensureAuthMiddleware,
  createArticleController
);
articleRouter.get('/feed', ensureAuthMiddleware, retrieveUserFeedController);
articleRouter.get('/user/:username', listArticlesController);
// articleRouter.post('/:post', ensureAuthMiddleware, retrieveArticleController);
articleRouter.post('/:post/like', ensureAuthMiddleware, createLikeController);
articleRouter.post(
  '/:post/dislike',
  ensureAuthMiddleware,
  removeLikeController
);

export default articleRouter;
