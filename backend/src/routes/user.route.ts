import { Router } from "express";
const router = Router();

import userController from "../controllers/user.controller";

router.get("/me", userController.userInfoController);
router.get("/shops", userController.userShopsController);
export default router;
