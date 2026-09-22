import { catchAsync } from "../../utils/CatchAsync.js";
import { Request, Response } from "express";
import { sendResponse } from "../../utils/sendResponse.js";
import postService from "./post.container.js";

export const createPostController = catchAsync(
  async (req: Request, res: Response) => {
    let result;
    if (req.file?.path) {
      result = await postService.createPost(
        req.body,
        req.userId as string,
        req.file?.path,
      );
    } else {
      result = await postService.createPost(req.body, req.userId as string);
    }

    sendResponse(res, 201, {
      success: true,
      message: "Post created successfullly",
      data: result,
    });
  },
);

export const getAllPostsController = catchAsync(
  async (req: Request, res: Response) => {
    // const { cursor, limit } = req.query;

    // const parsedLimit = limit ? parseInt(limit as string) : 10;

    const result = await postService.getAllPosts();

    sendResponse(res, 200, {
      success: true,
      message: "User all posts fetched successfully",
      data: result,
    });
  },
);

export const getPostByIdController = catchAsync(
  async (req: Request, res: Response) => {
    const postId = req.params.id as string;
    const result = await postService.getPostById(postId);

    sendResponse(res, 200, {
      success: true,
      message: "Post fetched successfully",
      data:result
    });
  },
);

export const getUserPostsController = catchAsync(
  async (req: Request, res: Response) => {
    const result = await postService.getUserPosts(req.userId as string);

    sendResponse(res, 200, {
      success: true,
      message: "User posts fetched successfully",
      data: result,
    });
  },
);

export const updatePostController = catchAsync(
  async (req: Request, res: Response) => {
    const postId = req.params.id as string;
    const result = await postService.updatePost(
      postId,
      req.userId as string,
      req.body,
    );

    sendResponse(res, 200, {
      success: true,
      message: "Post updated Successfully",
      data: result,
    });
  },
);

export const deletePostController = catchAsync(
  async (req: Request, res: Response) => {
    const postId = req.params.id as string;

    await postService.deletePost(postId, req.userId as string);

    sendResponse(res, 200, {
      success: true,
      message: "Post deleted successfulluy",
    });
  },
);
