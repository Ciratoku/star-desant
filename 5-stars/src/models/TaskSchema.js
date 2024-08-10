import mongoose, { Schema } from "mongoose";

const taskSchema = new Schema({
  text: String,
});

const Task = mongoose.model("Task", taskSchema);
export const TaskSchema = Task.schema;
export default Task;
