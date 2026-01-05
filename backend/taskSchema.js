import mongoose, { Schema } from "mongoose";

const TaskSchema = new Schema({
    taskDis: {
        type: String,
        required: true,
    },
    duedate: {
        type: Date,
        required: true,
    },
    priority: {
        type: String,
        required: true,
    },
    company: {
        type: String,
        required: true,
    }
});

const taskModel = mongoose.model("Task", TaskSchema);
export default taskModel;
