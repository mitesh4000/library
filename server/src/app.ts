import cors from "cors";
import dotenv from "dotenv";
import express, { Application } from "express";
import morgan from "morgan";
import path from "path";
import authRoutes from "./routes/auth.routes";
import taskRoutes from "./routes/category.routes";
import bookRoutes from "./routes/book.routes";
import userRoutes from "./routes/user.routes";
import { connectToDatabase } from "./utils/connectToDb";
import { validateEnv } from "./utils/validateEnv";

dotenv.config();

validateEnv();

const app: Application = express();
const port = process.env.PORT || 3000;

connectToDatabase();

app.use(cors());
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static(path.resolve(path.join(__dirname, "../public"))));

app.get("/", (req, res) => {
	res.sendFile(path.resolve(path.join(__dirname, "public", "index.html")));
});

app.use("/api/", authRoutes, userRoutes, taskRoutes, bookRoutes);

app.use((req, res) => {
	res.status(404).json({ error: "Route not found" });
});

app.listen(port, () => {
	console.log(
		`🌐 Server running on port ${port} in [ 🛠️  ${process.env.NODE_ENV} ] mode`
	);
});

export default app;
