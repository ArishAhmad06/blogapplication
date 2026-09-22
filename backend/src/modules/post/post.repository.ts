import { Post } from "../../../generated/prisma/index.js";
import { IPostReposiotory } from "./post.repository.interface.js";
import { prisma } from "../../lib/prisma.js";
import { updatePostDTO } from "./post.schema.js";

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


  

  async getAllPosts(): Promise<Post[]> {
    const posts = await prisma.post.findMany({});
    return posts;
  }



  async getPostsByUserId(userId: string): Promise<Post[]> {
    const posts = await prisma.post.findMany({
      where: {
        userId,
      },
    });
    return posts;
  }

  async getPostByPostIdAndUserId(
    postId: string,
    userId: string,
  ): Promise<Post | null> {
    const post = await prisma.post.findFirst({
      where: {
        id: postId,
        userId,
      },
    });
    return post;
  }

  async updatePost(postId: string, data: updatePostDTO): Promise<Post> {
    const updatedPost = await prisma.post.update({
      where: {
        id: postId,
      },
      data: {
        ...(data.title !== undefined && {
          title: data.title,
        }),
        ...(data.description !== undefined && {
          description: data.description,
        }),
      },
    });
    return updatedPost;
  }

  async deletePost(postId: string): Promise<void> {
    await prisma.post.delete({
      where: {
        id: postId,
      },
    });
  }
}
