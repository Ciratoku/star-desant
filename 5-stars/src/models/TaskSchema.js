import mongoose, { Schema } from "mongoose";

const taskSchema = new Schema({
  text: String,
});

const Task = mongoose.model("Task", taskSchema);
export default Task;
