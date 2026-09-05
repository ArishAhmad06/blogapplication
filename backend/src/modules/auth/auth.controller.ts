import { NextFunction, Request, Response } from "express";
import { catchAsync } from "../../utils/CatchAsync.js";
import { authService } from "./auth.container.js";
import { sendResponse } from "../../utils/sendResponse.js";
import { AppError } from "../../utils/AppError.js";
import { destroyCookies, setCookies } from "../../utils/auth.helper.js";

export const registerUserController = catchAsync(
  async (req: Request, res: Response) => {
    const result = await authService.registerUser(req.body);

    setCookies(res, result.accessToken, result.refreshToken);

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

    setCookies(res, result.accessToken, result.refreshToken);

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

    setCookies(res, result.accessToken, result.refreshToken);

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

    destroyCookies(res);

    sendResponse(res, 200, {
      success: true,
      message: "logged out successfully",
    });
  },
);

export const logoutAllController = catchAsync(
  async (req: Request, res: Response) => {
    const result = await authService.logoutAllDevices(req.userId as string);

    destroyCookies(res);
    sendResponse(res, 200, {
      success: true,
      message: "Logged out of all devices",
    });
  },
);
