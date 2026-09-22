import {
  createCommentDTO,
  createCommentSchema,
  updateCommentDTO,
} from "./comment.schema.js";
import { ICommentRepository } from "./comment.repository.interface.js";
import { AppError } from "../../utils/AppError.js";
import { IPostReposiotory } from "../post/post.repository.interface.js";

export class CommentService {
  constructor(
    private commentRepo: ICommentRepository,
    private postRepo: IPostReposiotory,
  ) {}
  async createComment(postId: string, userId: string, data: createCommentDTO) {
    const post = await this.postRepo.getPostById(postId);
    if (!post) {
      throw new AppError("Post not found", 404);
    }
    const newComment = await this.commentRepo.createComment(
      postId,
      userId,
      data,
    );
    return newComment;
  }

  async getCommentsByPostId(postId: string) {
    const post = await this.postRepo.getPostById(postId);
    if (!post) {
      throw new AppError("Post not found", 404);
    }

    const comments = await this.commentRepo.getCommentsByPostId(postId);

    return comments;
  }

  async getCommentById(commentId: string) {
    const comment = await this.commentRepo.getCommentById(commentId);
    if (!comment) {
      throw new AppError("Comment not found", 404);
    }
    return comment;
  }

  async updateCommentById(
    commentId: string,
    userId: string,
    data: updateCommentDTO,
  ) {
    const comment = await this.commentRepo.getCommentById(commentId);
    if (!comment) {
      throw new AppError("Comment not found", 404);
    }
    if (comment.userId !== userId) {
      throw new AppError("You are not allowed to update this comment", 403);
    }
    const updatedComment = await this.commentRepo.updateCommentById(
      commentId,
      data,
    );
    return updatedComment;
  }

  async deleteCommentById(commentId: string, userId: string) {
    const comment = await this.commentRepo.getCommentById(commentId);

    if (!comment) {
      throw new AppError("Comment not found", 404);
    }

    if (comment.userId !== userId) {
      throw new AppError("Unauthorized to perform this action", 401);
    }
    await this.commentRepo.deleteCommentById(commentId);
    return true;
  }
}
