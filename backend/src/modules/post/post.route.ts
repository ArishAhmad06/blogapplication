import express from "express";
import { validate } from "../../middlewares/validate.middleware.js";
import { createPostSchema } from "./post.schema.js";
import { verifyUser } from "../../middlewares/auth.middleware.js";
import { authService } from "../auth/auth.container.js";
import { upload } from "../../middlewares/multer.middleware.js";
import {
  createPostController,
  getUserPostsController,
} from "./post.controller.js";

const router = express.Router();
router
  .route("/create")
  .post(
    verifyUser(authService),
    upload.single("media"),
    validate(createPostSchema),
    createPostController,
  );
router.route("/your-posts").get(verifyUser(authService), getUserPostsController);
export default router;
