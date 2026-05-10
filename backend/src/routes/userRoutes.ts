import { Router } from "express";
import { getUserInfo } from "../controllers/userController";

const router = Router();

router.get("/me", getUserInfo);
export default router;
