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
