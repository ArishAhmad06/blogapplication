import { z } from "zod";

export const createCommentSchema = z
  .object({
    comment: z.string().min(1, "Comment cannot be empty"),
  })
  .strict();

export type createCommentDTO = z.infer<typeof createCommentSchema>;

export const updateCommentSchema = z
  .object({
    comment: z.string().min(1, "Comment cannot be empty"),
  })
  .strict();

export type updateCommentDTO = z.infer<typeof updateCommentSchema>;
