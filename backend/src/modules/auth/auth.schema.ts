import { z } from "zod";

export const registerUserSchema = z.object({
  username: z.string().min(3, "username must be at least characters long"),
  email: z.email("Email is required."),
  password: z.string().min(6, "Password must be at least 6 characters long"),
});

export type registerUserData = z.infer<typeof registerUserSchema>;
