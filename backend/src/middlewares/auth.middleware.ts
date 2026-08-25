import { Request, Response, NextFunction } from "express";
import { verifyAccessToken } from "../utils/jwt.helper.js";
import { AppError } from "../utils/AppError.js";
import { IJwtPayLoad } from "../types/index.js";
import { authRepository } from "../modules/auth/auth.repository.js";

export const verifyUser = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const token =
      req.cookies?.accessToken ||
      req.header("Authorization")?.replace("Bearer ", "");

    if (!token) {
      throw new AppError("Unauthorized request", 401);
    }
    const decoded = verifyAccessToken(token) as IJwtPayLoad;

    const user = await authRepository.findUserById(decoded.userId);
    if (!user) {
      throw new AppError("Unauthorized request", 401);
    }

    req.user = {
      userId: decoded.userId,
    };

    next();
  } catch (error) {
    next(new AppError("Invalid and expired token", 401));
  }
};
