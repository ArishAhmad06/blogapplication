import express from "express";
import { validate } from "../../middlewares/validate.middleware.js";
import { createPostSchema } from "./post.schema.js";
import { verifyUser } from "../../middlewares/auth.middleware.js";
import { authService } from "../auth/auth.container.js";
import { upload } from "../../middlewares/multer.middleware.js";
import { createPostController } from "./post.controller.js";

const router = express.Router();
router
  .route("/create")
  .post(
    verifyUser(authService),
    validate(createPostSchema),
    upload.single("media"),
    createPostController,
  );

  export default router;
  // addd comment