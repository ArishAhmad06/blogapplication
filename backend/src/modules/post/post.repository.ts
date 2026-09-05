import { Post } from "../../../generated/prisma/index.js";
import { IPostReposiotory } from "./post.repository.interface.js";
import { prisma } from "../../lib/prisma.js";

export class PostRepository implements IPostReposiotory {
  async createPost(
    title: string,
    description: string,
    userId: string,
    imageUrl?: string,
  ): Promise<Post> {
    let createdPost;
    if (imageUrl) {
      createdPost = await prisma.post.create({
        data: {
          title,
          description,
          imageUrl: imageUrl ?? null,
          userId,
        },
      });
    } else {
      createdPost = await prisma.post.create({
        data: {
          title,
          description,
          userId,
        },
      });
    }
    return createdPost;
  }
}
