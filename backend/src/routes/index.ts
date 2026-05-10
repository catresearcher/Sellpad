import { Router } from "express";
const router = Router();

import { sessionAuth } from "../middlewares/authMiddleware";

import authRoutes from "./authRoutes";
import shopRoutes from "./shopRoutes";
import userRoutes from "./userRoutes";

// Apply routes
router.use("/api/auth", authRoutes);
router.use("/api/shop", sessionAuth, shopRoutes);
router.use("/api/user", sessionAuth, userRoutes);

export default router;
