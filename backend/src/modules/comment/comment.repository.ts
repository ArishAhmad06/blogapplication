import { Comment } from "../../../generated/prisma/index.js";
import { prisma } from "../../lib/prisma.js";
import { ICommentRepository } from "./comment.repository.interface.js";
import { createCommentDTO } from "./comment.schema.js";

export class CommentRepository implements ICommentRepository {
  async createComment(
    postId: string,
    userId: string,
    data: createCommentDTO,
  ): Promise<Comment> {
    const newComment = await prisma.comment.create({
      data: {
        postId,
        userId,
        comment: data.comment,
      },
    });
    return newComment;
  }
}
