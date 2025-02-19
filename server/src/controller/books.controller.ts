import { Request, Response } from "express";
import { ObjectId } from "mongodb";
import { z } from "zod";
import { authRequest } from "../types/authRequest";
import { errorResponse, successResponse } from "../utils/responseFormatter";
import { bookIputValidation } from "../utils/validationSchemas";
import Book from "../model/book.model";

export const addBook = async (req: authRequest, res: Response) => {
	try {
		console.log(req.file);
		const validatedData = bookIputValidation.parse(req.body);
		const newBook = new Book(validatedData);
		newBook.userId = new ObjectId(req.userId);
		await newBook.save();
		return res.status(201).json(newBook);
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

export const listBooks = async (req: authRequest, res: Response) => {
	const userId = req.userId;
	console.log(userId);
	try {
		if (!userId) {
			return res
				.status(401)
				.json(errorResponse("Unauthorized", "User not found"));
		}
		const projects = await Book.find({ isDeleted: false });
		return res.status(200).json(projects);
	} catch (error) {
		console.error(error);
		return res
			.status(500)
			.json(errorResponse("Internal server error", error as string));
	}
};

// export const deleteBook = async (req: Request, res: Response) => {
//   try {
//     const taskId = req.params.id;
//     const deletedBook = await Book.findByIdAndUpdate(taskId, {
//       isDeleted: true,
//     });
//     if (!deletedBook) {
//       return res.status(404).json({ message: "Book not found" });
//     }
//     return res.status(200).json({ message: "Book deleted successfully" });
//   } catch (error) {
//     console.error(error);
//     return res.status(500).json({ message: "Server error" });
//   }
// };

// export const updateBook = async (req: Request, res: Response) => {
//   try {
//     const taskId = req.params.id;
//     if (!taskId) {
//       return res
//         .status(400)
//         .json(errorResponse("Invalid request", "taskId not provided"));
//     }
//     const validatedData = taskIputValidation.parse(req.body);
//     const updatedBook = await Book.findByIdAndUpdate(taskId, validatedData, {
//       new: true,
//     });
//     if (!updatedBook) {
//       return res
//         .status(404)
//         .json(errorResponse("Book not found", "Book not found"));
//     }
//     return res.status(200).json(successResponse(updatedBook, "Book updated"));
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
