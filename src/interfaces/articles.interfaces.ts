import { Post } from '@prisma/client';

export interface ArticleRequest extends Partial<Post> {
  content: string;
  localization?: string;

  quotedArticleId?: string;
  replyingArticleId?: string;
}
