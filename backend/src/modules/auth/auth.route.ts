import express from "express";
import { registerUserController } from "./auth.controller.js";

const router = express.Router();
router.route("/register").post(registerUserController);
export default router;
