import {
  deleteFromCloudinary,
  uploadToCloudinary,
} from "../../utils/cloudinary.helper.js";
import { createPostDTO } from "./post.schema.js";
import { IPostReposiotory } from "./post.repository.interface.js";
import { updatePostDTO } from "./post.schema.js";
import { AppError } from "../../utils/AppError.js";

export class PostService {
  constructor(private repo: IPostReposiotory) {}
  async createPost(
    body: createPostDTO,
    userId: string,
    localFilePath?: string,
  ) {
    let createdPost;
    const { title, description } = body;
    if (localFilePath) {
      const imageUrl = await uploadToCloudinary(localFilePath);
      createdPost = await this.repo.createPost(
        title,
        description,
        userId,
        imageUrl,
      );
    } else {
      createdPost = await this.repo.createPost(title, description, userId);
    }
    return createdPost;
  }

  async getAllPosts() {
    const posts = await this.repo.getAllPosts();

    return posts;
  }

  async getPostById(postId: string) {
    const post = await this.repo.getPostById(postId);
    if (!post) {
      throw new AppError("Post not found", 404);
    }
    return post;
  }

  async getUserPosts(userId: string) {
    const posts = await this.repo.getPostsByUserId(userId);
    return posts;
  }

  async updatePost(postId: string, userId: string, data: updatePostDTO) {
    const post = await this.repo.getPostByPostIdAndUserId(postId, userId);
    if (!post) {
      throw new AppError("Post not found", 404);
    }
    const updatedPost = await this.repo.updatePost(postId, data);
    return updatedPost;
  }

  async deletePost(postId: string, userId: string) {
    const post = await this.repo.getPostByPostIdAndUserId(postId, userId);
    if (!post) {
      throw new AppError("Post not found", 404);
    }
    if (post.imageUrl) {
      await deleteFromCloudinary(post.imageUrl);
    }

    await this.repo.deletePost(postId);
    return true;
  }
}
