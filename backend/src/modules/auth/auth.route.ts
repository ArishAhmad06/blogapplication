import express from "express";
import {
  registerUserController,
  loginUserController,
  refreshTokenController,
  currentUserController,
  logoutController,
  logoutAllController,
} from "./auth.controller.js";
import { validate } from "../../middlewares/validate.middleware.js";
import { verifyUser } from "../../middlewares/auth.middleware.js";
import {
  loginUserSchema,
  refreshTokenSchema,
  registerUserSchema,
} from "./auth.schema.js";

const router = express.Router();
router
  .route("/register")
  .post(validate(registerUserSchema), registerUserController);

router.route("/login").post(validate(loginUserSchema), loginUserController);

router
  .route("/refreshToken")
  .post(validate(refreshTokenSchema), refreshTokenController);

router.route("/me").get(verifyUser, currentUserController);

router.route("/logout").post(verifyUser, logoutController);
router.route("/logout-all-devices").post(verifyUser, logoutAllController);

export default router;
