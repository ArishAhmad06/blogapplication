import bcrypt from "bcrypt";
import crypto from "crypto";
const SALT_ROUND = 10;
import { Response } from "express";
import { NODE_ENV } from "../config/config.js";
import { access } from "fs";

export const hashPassword = async (password: string) => {
  return await bcrypt.hash(password, SALT_ROUND);
};

export const comparePassword = async (
  password: string,
  hashedPasswordInDb: string,
) => {
  return await bcrypt.compare(password, hashedPasswordInDb);
};

export const hashRefreshToken = (refreshToken: string) => {
  return crypto.createHash("sha256").update(refreshToken).digest("hex");
};

export const setCookies = (
  res: Response,
  accessToken: string,
  refreshToken: string,
) => {
  res.cookie("accessToken", accessToken, {
    httpOnly: true,
    secure: NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 24 * 60 * 60 * 1000,
  });

  res.cookie("refreshToken", refreshToken, {
    httpOnly: true,
    secure: NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 30 * 60 * 60 * 1000,
  });
};

export const destroyCookies = (res: Response) => {
  res.clearCookie("accessToken", {
    httpOnly: true,
    secure: NODE_ENV === "production",
    sameSite: "lax",
  });

  res.clearCookie("refreshToken", {
    httpOnly: true,
    secure: NODE_ENV === "production",
    sameSite: "lax",
  });
};
