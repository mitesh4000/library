import { Router } from "express";
import { getProfile, login, register } from "../controller/auth.controller";
import authMiddleware from "../middleware/auth.middleware";

const router = Router();
router.post("/auth/register", register);
router.post("/auth/login", login);
router.use(authMiddleware);
router.get("/auth/get-profile", getProfile);

export default router;
