import { catchAsync } from "../../utils/CatchAsync.js";
import { Request, Response } from "express";
import { sendResponse } from "../../utils/sendResponse.js";
import { verifyUser } from "../../middlewares/auth.middleware.js";

export const createPostController = catchAsync(
  async (req: Request, res: Response) => {
    const { title, description } = req.body;
    const data = {
      title: title,
      description: description,
      userId: req.userId,
      file: req.file,
    };
    const result = await postService.createPost(data, verifyUser);

    sendResponse(res, 201, {
      success: true,
      message: "Post created",
      data: result,
    });
  },
);
