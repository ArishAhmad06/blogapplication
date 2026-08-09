import { Request, Response } from "express";
import { catchAsync } from "../../utils/catchAsync.js";
import { success } from "zod";

export const registerUserController = catchAsync(
  async (req: Request, res: Response) => {
    const { username, email, password } = req.body;
    console.log({ username, email, password });
    return res.status(201).json({
      success: true,
      message: "Account created successfully",
    });
  },
);
