import express from "express";
import { validate } from "../../middlewares/validate.middleware.js";
import { verifyUser } from "../../middlewares/auth.middleware.js";

import {
  createCommentController,
  getCommentsByPostIdContoller,
} from "../comment/comment.controller.js";
import { createCommentSchema } from "./comment.schema.js";

const router = express.Router();
router
  .route("/:postId/comments")
  .post(verifyUser, validate(createCommentSchema), createCommentController)
  .get(getCommentsByPostIdContoller);

export default router;
