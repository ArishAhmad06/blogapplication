import { Comment } from "../../../generated/prisma/index.js";
import { createCommentDTO, updateCommentDTO } from "./comment.schema.js";

export interface ICommentRepository {
  createComment(
    postId: string,
    userId: string,
    data: createCommentDTO,
  ): Promise<Comment>;

  getCommentsByPostId(postId: string): Promise<Comment[]>;
  getCommentById(commentId: string): Promise<Comment | null>;
  updateCommentById(
    commentId: string,
    data: updateCommentDTO,
  ): Promise<Comment>;
  deleteCommentById(commentId: string): Promise<void>;
}
