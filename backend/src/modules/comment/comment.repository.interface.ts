import { Comment } from "../../../generated/prisma/index.js";
import { createCommentDTO } from "./comment.schema.js";

export interface ICommentRepository {
  createComment(
    postId: string,
    userId: string,
    data: createCommentDTO,
  ): Promise<Comment>;
}
