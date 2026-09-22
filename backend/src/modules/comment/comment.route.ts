import express from "express";
import { validate } from "../../middlewares/validate.middleware.js";
import { verifyUser } from "../../middlewares/auth.middleware.js";

import {
  createCommentController,
  getCommentsByPostIdContoller,
  getCommentByIdController,
  deleteCommentByIdController,
  updateCommentByIdController,
} from "../comment/comment.controller.js";
import { createCommentSchema, updateCommentSchema } from "./comment.schema.js";
import { authService } from "../auth/auth.container.js";

const router = express.Router();
router
  .route("/:postId/comments")
  .post(
    verifyUser(authService),
    validate(createCommentSchema),
    createCommentController,
  )
  .get(getCommentsByPostIdContoller);
router
  .route("/:postId/comments/:commentId")
  .get(getCommentByIdController)
  .patch(
    verifyUser(authService),
    validate(updateCommentSchema),
    updateCommentByIdController,
  )
  .delete(verifyUser(authService), deleteCommentByIdController);

export default router;
