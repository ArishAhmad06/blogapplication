import { catchAsync } from "../../utils/CatchAsync.js";
import { Request, Response } from "express";
import { sendResponse } from "../../utils/sendResponse.js";
import commentService from "./comment.container.js";

export const createCommentController = catchAsync(
  async (req: Request, res: Response) => {
    const postId = req.params.postId as string;
    const userId = req.userId as string;
    const result = await commentService.createComment(postId, userId, req.body);

    sendResponse(res, 200, {
      success: true,
      message: "Comment created successfully",
      data: result,
    });
  },
);

export const getCommentsByPostIdContoller = catchAsync(
  async (req: Request, res: Response) => {
    const postId = req.params.postId as string;

    const result = await commentService.getCommentsByPostId(postId);

    sendResponse(res, 200, {
      success: true,
      message: "Comments fetched successfully",
      data: result,
    });
  },
);

export const getCommentByIdController = catchAsync(
  async (req: Request, res: Response) => {
    const commentId = req.params.commentId as string;
    const result = await commentService.getCommentById(commentId);

    sendResponse(res, 200, {
      success: true,
      message: "Comment fetched successfully",
      data: result,
    });
  },
);
