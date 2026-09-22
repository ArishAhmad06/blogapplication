import { Post } from "../../../generated/prisma/index.js";
import { updatePostDTO } from "./post.schema.js";

export interface IPostReposiotory {
  createPost(
    title: string,
    description: string,
    userId: string,
    imageUrl?: string,
  ): Promise<Post>;
  getPostsByUserId(userId: string): Promise<Post[]>;

  updatePost(
    postId: string,
    data: updatePostDTO,
  ): Promise<any>;

  getPostByPostIdAndUserId(
    postId: string,
    userId: string,
  ): Promise<Post | null>;

  // getAllPosts(cursor?: string, limit?: number): Promise<Post[]>;
}
