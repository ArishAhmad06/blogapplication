import { loginUserDTO, registerUserDTO } from "./auth.schema.js";
import { authRepository } from "./auth.repository.js";
import { AppError } from "../../utils/AppError.js";
import {
  comparePassword,
  hashPassword,
  hashRefreshToken,
} from "../../utils/auth.helper.js";
import {
  generateAccessToken,
  generateRefreshToken,
} from "../../utils/jwt.helper.js";
import { toUserResponse } from "./auth.mapper.js";

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

    const hashedPassword = await hashPassword(password);

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
};
