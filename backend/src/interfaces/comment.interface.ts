import { Comment } from '../album/schemas/comment.schema';

export interface CommentType extends Comment {
  createdAt: Date;
  updatedAt: Date;
}
