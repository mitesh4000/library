import { Request, Response } from "express";
import { ObjectId } from "mongodb";
import { z } from "zod";
import Category from "../model/category.model";
import { authRequest } from "../types/authRequest";
import { errorResponse, successResponse } from "../utils/responseFormatter";
import { categoryIputValidation } from "../utils/validationSchemas";

export const createCategory = async (req: authRequest, res: Response) => {
	try {
		const validatedData = categoryIputValidation.parse(req.body);
		const newCategory = new Category(validatedData);
		await newCategory.save();
		return res.status(201).json(newCategory);
	} catch (error) {
		if (error instanceof z.ZodError) {
			return res.status(400).json(
				errorResponse(
					"invalid input",
					error.errors?.map(
						(item, index) => `${item.path[0]} - ${item.message}`
					)
				)
			);
		}
		const errorMessage =
			error instanceof Error ? error.message : "An unexpected error occurred";
		return res
			.status(500)
			.json(errorResponse("internal server error", errorMessage));
	}
};

export const listCategory = async (req: authRequest, res: Response) => {
	const userId = req.userId;
	console.log(userId);
	try {
		if (!userId) {
			return res
				.status(401)
				.json(errorResponse("Unauthorized", "User not found"));
		}
		const projects = await Category.find({ isDeleted: false });
		return res.status(200).json(projects);
	} catch (error) {
		console.error(error);
		return res
			.status(500)
			.json(errorResponse("Internal server error", error as string));
	}
};

// export const deletes = async (req: Request, res: Response) => {
//   try {
//     const taskId = req.params.id;
//     const deleteds = await Category.findByIdAndUpdate(taskId, {
//       isDeleted: true,
//     });
//     if (!deleteds) {
//       return res.status(404).json({ message: "s not found" });
//     }
//     return res.status(200).json({ message: "s deleted successfully" });
//   } catch (error) {
//     console.error(error);
//     return res.status(500).json({ message: "Server error" });
//   }
// };

// export const updates = async (req: Request, res: Response) => {
//   try {
//     const taskId = req.params.id;
//     if (!taskId) {
//       return res
//         .status(400)
//         .json(errorResponse("Invalid request", "taskId not provided"));
//     }
//     const validatedData = taskIputValidation.parse(req.body);
//     const updateds = await Category.findByIdAndUpdate(taskId, validatedData, {
//       new: true,
//     });
//     if (!updateds) {
//       return res
//         .status(404)
//         .json(errorResponse("s not found", "Category not found"));
//     }

//     return res.status(200).json(successResponse(updateds, "Category updated"));
//   } catch (error: Error | any) {
//     if (error instanceof z.ZodError) {
//       return res.status(400).json(
//         errorResponse(
//           "invalid input",
//           error.errors?.map(
//             (item, index) => `${item.path[0]} - ${item.message}`
//           )
//         )
//       );
//     }
//     console.warn(error);
//     return res.status(500).json(errorResponse("internal server error", error));
//   }
// };
