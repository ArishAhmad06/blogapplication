import { PassThrough } from "node:stream";
import { string, z } from "zod";

export const registerUserSchema = z.object({
  username: z.string().min(3, "username must be at least 3 characters long"),
  email: z.email("Email is required."),
  password: z.string().min(6, "Password must be at least 6 characters long"),
});

export const loginUserSchema = z.object({
  email: z.email("Email is required"),
  password: z.string().min(1, "Password is required"),
});

export type registerUserDTO = z.infer<typeof registerUserSchema>;
export type loginUserDTO = z.infer<typeof loginUserSchema>;
