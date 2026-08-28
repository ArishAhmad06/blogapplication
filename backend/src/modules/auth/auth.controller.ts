import { Request, Response } from "express";
import { catchAsync } from "../../utils/CatchAsync.js";
import { authService } from "./auth.service.js";
import { sendResponse } from "../../utils/sendResponse.js";
import { success } from "zod";
import { AppError } from "../../utils/AppError.js";
import { NextFunction } from "express-serve-static-core";

export const registerUserController = catchAsync(
  async (req: Request, res: Response) => {
    const result = await authService.registerUser(req.body);

    sendResponse(res, 201, {
      success: true,
      message: "Account created successfully",
      data: result,
    });
  },
);

export const loginUserController = catchAsync(
  async (req: Request, res: Response) => {
    const result = await authService.loginUser(req.body);

    sendResponse(res, 200, {
      success: true,
      message: "Logged in successfully",
      data: result,
    });
  },
);

export const refreshTokenController = catchAsync(
  async (req: Request, res: Response) => {
    const result = await authService.refreshToken(req.body);

    sendResponse(res, 202, {
      success: true,
      message: "Token refreshed successfully",
      data: result,
    });
  },
);

export const currentUserController = catchAsync(
  async (req: Request, res: Response) => {
    if (!req?.userId) {
      throw new AppError("Unauthorized request", 401);
    }
    const result = await authService.getCurrentUser(req?.userId as string);

    sendResponse(res, 200, {
      success: true,
      message: "User detail fetched suceefully",
      data: result,
    });
  },
);

export const logoutController = catchAsync(
  async (req: Request, res: Response) => {
    const { refreshToken } = req.body;

    const result = await authService.logout(refreshToken);

    sendResponse(res, 200, {
      success: true,
      message: "logged out successfully",
    });
  },
);

export const logoutAllController = catchAsync(
  async (req: Request, res: Response) => {
    const result = await authService.logoutAllDevices(req.userId as string);
    sendResponse(res, 200, {
      success: true,
      message: "Logged out of all devices",
    });
  },
);
