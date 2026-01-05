import mongoose, { Schema } from "mongoose";

const tasksmanagementSchema = new Schema({
    description: { type: String, required: true },
    relatedTo: { type: String, required: true },
    dueDate: { type: Date, required: true },
    priority: { type: String, enum: ["High", "Medium", "Low"], required: true },
    owner: { type: String, required: true },
    ownerPhoto: { type: String },
    status: { type: String, enum: ["Pending", "Completed", "Overdue"], default: "Pending" },
    createdAt: { type: Date, default: Date.now },
});

const tasksmanagementModel = mongoose.model("tasksmanagement", tasksmanagementSchema);
export default tasksmanagementModel;