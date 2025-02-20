import { Router } from "express";
import { getAllUsers } from "../controller/user.controller";

const router = Router();

router.get("/user", getAllUsers);

export default router;
