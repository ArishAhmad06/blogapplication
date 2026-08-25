import {
  loginUserDTO,
  refreshTokenDTO,
  registerUserDTO,
} from "./auth.schema.js";
import { authRepository } from "./auth.repository.js";
import { AppError } from "../../utils/AppError.js";
import { comparePassword, hashRefreshToken } from "../../utils/auth.helper.js";
import {
  generateAccessToken,
  generateRefreshToken,
  verifyRefreshToken,
} from "../../utils/jwt.helper.js";
import { toUserResponse } from "./auth.mapper.js";
import { IJwtPayLoad } from "../../types/index.js";
import { decode } from "node:punycode";

export const authService = {
  registerUser: async (body: registerUserDTO) => {
    const { username, email, password } = body;

    const existingUserByUsername =
      await authRepository.findUserByUsername(username);

    if (existingUserByUsername) {
      throw new AppError("User already exists", 400);
    }

    const existingUserByEmail = await authRepository.findUserByEmail(email);
    if (existingUserByEmail) {
      throw new AppError("user already exists", 400);
    }

    const hashedPassword = await hashRefreshToken(password);

    const newUser = await authRepository.createUser(
      username,
      email,
      hashedPassword,
    );

    const accessToken = generateAccessToken(newUser.id);
    const refreshToken = generateRefreshToken(newUser.id);

    const hashedRefreshToken = hashRefreshToken(refreshToken);

    await authRepository.createRefreshToken({
      token: hashedRefreshToken,
      userId: newUser.id,
      expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
    });

    return {
      user: toUserResponse(newUser),
      accessToken,
      refreshToken,
    };
  },

  loginUser: async (body: loginUserDTO) => {
    const { email, password } = body;

    //find user
    const user = await authRepository.findUserByEmail(email);
    if (!user) {
      throw new AppError("Invalid email or password", 404);
    }

    //compare password
    const isPassword = await comparePassword(password, user.password);
    if (!isPassword) {
      throw new AppError("Invalid email or password", 401);
    }

    // if password is correct - generate access tokens
    const accessToken = generateAccessToken(user.id);
    const refreshToken = generateRefreshToken(user.id);

    const hashedRefreshToken = hashRefreshToken(refreshToken);

    //store refresh token
    await authRepository.createRefreshToken({
      token: hashedRefreshToken,
      userId: user.id,
      expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
    });
    return {
      user: toUserResponse(user),
      accessToken,
      refreshToken,
    };
  },

  refreshToken: async (body: refreshTokenDTO) => {
    const { token } = body;
    if (!token) {
      throw new AppError("Refresh token required", 401);
    }
    let decoded;
    try {
      decoded = verifyRefreshToken(token) as IJwtPayLoad;
    } catch {
      throw new AppError("Invalid or expired refresh token", 403);
    }
    const hashedToken = hashRefreshToken(token);

    const existingToken = await authRepository.findRefreshToken(hashedToken);
    if (!existingToken) {
      throw new AppError("Refresh token not found", 403);
    }

    await authRepository.deleteRefreshTokenById(existingToken.id);

    const newAccessToken = generateAccessToken(decoded.userId);
    const newRefreshToken = generateRefreshToken(decoded.userId);

    const newRefreshTokenHashed = hashRefreshToken(newRefreshToken);

    await authRepository.createRefreshToken({
      token: newRefreshTokenHashed,
      userId: decoded.userId,
      expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
    });
    return {
      accessToken: newAccessToken,
      refreshToken: newRefreshToken,
    };
  },

  getCurrentUser: async (userId: string) => {
    const user = await authRepository.findUserById(userId);

    if (!user) {
      throw new AppError("user not found", 404);
    }
    return {
      user: toUserResponse(user),
    };
  },
};
