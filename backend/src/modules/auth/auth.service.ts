import { registerUserDTO } from "./auth.schema.js";
import { authRepository } from "./auth.repository.js";
import { AppError } from "../../utils/AppError.js";
import { hashPassword } from "../../utils/auth.helper.js";
import {
  generateAccessToken,
  generateRefreshToken,
} from "../../utils/jwt.helper.js";
import { RefreshToken } from "../../../generated/prisma/index.js";

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
    const RefreshToken = generateRefreshToken(newUser.id);

    await authRepository.createRefreshToken({
      token: RefreshToken,
      userId: newUser.id,
      expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
    });

    return newUser;
  },
};
