import { Router } from "express";
const router = Router();

import { sessionAuth } from "../middlewares/authMiddleware";

import authRoutes from "./auth.route";
import shopRoutes from "./shop.route";
import userRoutes from "./user.route";

// Apply routes
router.use("/api/auth", authRoutes);
router.use("/api/shop", sessionAuth, shopRoutes);
router.use("/api/user", sessionAuth, userRoutes);

export default router;
