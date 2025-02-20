import { Router } from "express";
import {
	createCategory,
	listCategory,
} from "../controller/category.controller";
import authMiddleware from "../middleware/auth.middleware";

const router = Router();

router.use(authMiddleware);
router.post("/category", createCategory);
router.get("/category", listCategory);
// router.put("/category/:id", updateCategory);
// router.delete("/category/:id", deleteCategory);

export default router;
