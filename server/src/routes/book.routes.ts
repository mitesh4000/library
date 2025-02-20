import { Router } from "express";
import authMiddleware from "../middleware/auth.middleware";
import { addBook, listBooks } from "../controller/books.controller";
import multer, { FileFilterCallback } from "multer";
import path from "path";

const router = Router();
const storage = multer.diskStorage({
	destination: function (req, file, cb) {
		cb(null, "uploads");
	},
	filename: function (req, file, cb) {
		const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    const fileExtension = path.extname(file.originalname); // Get the file extension
		cb(null, file.fieldname + "-" + uniqueSuffix+fileExtension);
	},
});
const upload = multer({ storage: storage });
router.use(authMiddleware);
router.post("/book", upload.single("image"), addBook);
router.get("/book", listBooks);

export default router;
