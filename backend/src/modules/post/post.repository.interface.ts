import { Post } from "../../../generated/prisma/index.js";

export interface IPostReposiotory {
  createPost(
    title: string,
    description: string,
    userId: string,
    imageUrl?: string,
  ): Promise<Post>;
}
