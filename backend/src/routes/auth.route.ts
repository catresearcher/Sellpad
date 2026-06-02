import { Router } from "express";
import { blockIfAuthenticated } from "../middlewares/authMiddleware";

import userController from "../controllers/user.controller";

const router = Router();

router.post("/login", blockIfAuthenticated, userController.loginUserController);
router.post(
  "/register",
  blockIfAuthenticated,
  userController.createUserController,
);
router.post("/logout", userController.logoutUserController);

export default router;
