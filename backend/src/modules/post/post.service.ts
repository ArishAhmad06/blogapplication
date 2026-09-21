import { uploadToCloudinary } from "../../utils/cloudinary.helper.js";
import { createPostDTO } from "./post.schema.js";
import { IPostReposiotory } from "./post.repository.interface.js";

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

  async getUserPosts(userId: string) {
    const posts = await this.repo.getPostsByUserId(userId);
    return posts;
  }
}
