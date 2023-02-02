import { Request, Response } from 'express';
import createArticleService from '../services/articles/createArticle.service';
import createLikeService from '../services/articles/interactions/createLike.service';
import createRepostService from '../services/articles/interactions/createRepost.service';
import removeLikeService from '../services/articles/interactions/removeLike.service';
import removeRepostService from '../services/articles/interactions/removeRepost.service';
import listUserArticlesService from '../services/articles/listUserArticles.service';
import retrieveArticleService from '../services/articles/retrieveArticle.service';
import retrieveUserFeedService from '../services/articles/retrieveUserFeed.service';

export { ARTICLE_REQUIRED_FIELDS } from '../services/articles/createArticle.service';
export async function createArticleController(req: Request, res: Response) {
  const { id } = req.user;
  const article = await createArticleService(req.body, id);
  return setTimeout(() => {
    res.json(article);
  }, 800);
}

export async function listArticlesController(req: Request, res: Response) {
  const { page } = req.query;
  const { username } = req.params;
  const articles = await listUserArticlesService(username, Number(page) || 0);
  return res.json(articles);
}

export async function retrieveUserFeedController(req: Request, res: Response) {
  const { id } = req.user;
  const { page } = req.query;
  const articles = await retrieveUserFeedService(id, Number(page) || 0);
  return res.json(articles);
}

export async function retrieveArticleController(req: Request, res: Response) {
  const { postId } = req.params;
  const { id } = req.user;
  const article = await retrieveArticleService(postId, id);
  return res.json(article);
}

export async function createLikeController(req: Request, res: Response) {
  const { id } = req.user;
  const { post } = req.params;

  await createLikeService(id, post);
  return res.status(204).send();
}

export async function removeLikeController(req: Request, res: Response) {
  const { id } = req.user;
  const { post } = req.params;

  await removeLikeService(id, post);
  return res.status(204).send();
}

export async function createRepostController(req: Request, res: Response) {
  const { id } = req.user;
  const { post } = req.params;

  await createRepostService(id, post);
  return res.status(204).send();
}

export async function removeRepostController(req: Request, res: Response) {
  const { id } = req.user;
  const { post } = req.params;

  await removeRepostService(id, post);
  return res.status(204).send();
}
