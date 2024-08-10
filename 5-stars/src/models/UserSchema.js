import mongoose, { Schema } from "mongoose";

const userSchema = new Schema({
  login: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  tasks: [{ type: Schema.Types.ObjectId, ref: "Task" }],
});

const User = mongoose.model("User", userSchema);
export const UserSchema = User.schema;
export default User;
