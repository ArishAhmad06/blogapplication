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

  async getUserPosts(userId: string): Promise<Post[]> {
    const posts = await prisma.post.findMany({
      where: {
        userId,
      },
    });
    return posts;
  }

  // async getAllPosts(cursor?: string, limit: number = 10): Promise<Post[]> {
  //   const posts = await prisma.post.findMany({
  //     take: limit,
  //     skip: cursor ? 1 : 0,
  //     cursor: cursor ? { id: cursor } : undefined,
  //     orderBy: {
  //       createdAt: "desc",
  //     },
  //     select: {
  //       id: true,
  //       title: true,
  //       description: true,
  //       imageUrl: true,
  //       createdAt: true,
  //       updatedAt: true,
  //       userId: true,
  //     },
  //   });
  //   return posts;
  // }
}
