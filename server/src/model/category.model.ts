import mongoose, { Document } from "mongoose";

export interface ICategory extends Document {
	name: string;
	description: string;
}
const taskSchema = new mongoose.Schema(
	{
		name: {
			type: String,
			required: true,
		},
		description: {
			type: String,
			required: true,
		},
		isDeleted: {
			type: Boolean,
			default: false,
		},
		deletedAt: {
			type: Date,
		},
	},
	{ timestamps: true }
);

const Task = mongoose.model<ICategory>("Category", taskSchema);

export default Task;
