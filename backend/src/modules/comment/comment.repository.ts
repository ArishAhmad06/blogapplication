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

  async getCommentsByPostId(postId: string): Promise<Comment[]> {
    const comments = await prisma.comment.findMany({
      where: {
        postId,
      },
    });
    return comments;
  }

  async getCommentById(commentId: string): Promise<Comment | null> {
    const comment = await prisma.comment.findUnique({
      where: {
        id: commentId,
      },
    });
    return comment;
  }

  async deleteCommentById(commentId: string): Promise<void> {
    await prisma.comment.delete({
      where: {
        id: commentId,
      },
    });
  }
}
