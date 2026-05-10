import { Router } from "express";
import {
  loginUser,
  createUser,
  logoutUser,
} from "../controllers/userController";
import { blockIfAuthenticated } from "../middlewares/authMiddleware";

const router = Router();

router.post("/login", blockIfAuthenticated, loginUser);
router.post("/signup", blockIfAuthenticated, createUser);
router.get("/logout", logoutUser);

export default router;
