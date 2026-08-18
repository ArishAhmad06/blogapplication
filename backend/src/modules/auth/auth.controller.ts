import { Request, Response } from "express";
import { catchAsync } from "../../utils/CatchAsync.js";
import { authService } from "./auth.service.js";

export const registerUserController = catchAsync(
  async (req: Request, res: Response) => {
    const result = await authService.registerUser(req.body);

    return res.status(201).json({
      success: true,
      message: "Account created successfully",
      data: result,
    });
  },
);
