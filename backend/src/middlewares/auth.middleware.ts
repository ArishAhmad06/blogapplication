import { Request, Response, NextFunction } from "express";
import { verifyAccessToken } from "../utils/jwt.helper.js";
import { AppError } from "../utils/AppError.js";
import { IJwtPayLoad } from "../types/index.js";
import { AuthService } from "../modules/auth/auth.service.js";

export const verifyUser = (authService: AuthService) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const token =
        req.cookies?.accessToken ||
        req.header("Authorization")?.replace("Bearer ", "");

      if (!token) {
        throw new AppError("Unauthorized request", 401);
      }
      const decoded = verifyAccessToken(token) as IJwtPayLoad;

      const userData = await authService.getCurrentUser(decoded.userId);
      if (!userData?.user) {
        throw new AppError("Unauthorized request", 401);
      }

      req.userId = userData.user.id;

      next();
    } catch (error) {
      next(error);
    }
  };
};
