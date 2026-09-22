import express from "express";
import { validate } from "../../middlewares/validate.middleware.js";
import { verifyUser } from "../../middlewares/auth.middleware.js";
import { authService } from "../auth/auth.container.js";

import { createCommentController } from "../comment/comment.controller.js";
import { createCommentSchema } from "./comment.schema.js";

const router = express.Router();
router
  .route("/:postId/comments")
  .post(
    verifyUser(authService),
    validate(createCommentSchema),
    createCommentController,
  );

export default router;
