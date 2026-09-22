import express from "express";
import { validate } from "../../middlewares/validate.middleware.js";
import { createPostSchema, updatePostSchema } from "./post.schema.js";
import { verifyUser } from "../../middlewares/auth.middleware.js";
import { authService } from "../auth/auth.container.js";
import { upload } from "../../middlewares/multer.middleware.js";
import {
  createPostController,
  getAllPostsController,
  getUserPostsController,
  updatePostController,
  deletePostController,
  getPostByIdController,
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
router.route("/").get(getAllPostsController);
router.route("/:id").get(getPostByIdController);
router
  .route("/your-posts")
  .get(verifyUser(authService), getUserPostsController);
router
  .route("/:id")
  .patch(
    verifyUser(authService),
    validate(updatePostSchema),
    updatePostController,
  );
router.route("/:id").delete(verifyUser(authService), deletePostController);

export default router;
