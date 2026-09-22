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
