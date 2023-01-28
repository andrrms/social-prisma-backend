/* eslint-disable @typescript-eslint/no-unused-vars */
import { prisma } from '../../server';

import { ArticleRequest } from '../../interfaces/articles.interfaces';
import { Fields } from '../../interfaces/util.interfaces';
import sanitizeUser from '../../utils/sanitizeUser.util';

export const ARTICLE_REQUIRED_FIELDS: Fields<ArticleRequest> = ['content'];
export default async function createArticleService(
  article: ArticleRequest,
  userId: string
) {
  const createdArticle = await prisma.post.create({
    data: {
      ...article,
      authorId: userId,
    },
    include: {
      author: true,
    },
  });

  const { authorId: _, author, ...rest } = createdArticle;

  return {
    ...rest,
    author: sanitizeUser(author),
  };
}
