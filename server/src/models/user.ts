import { model, Schema } from "mongoose";
import { Role, User } from "../types";

const userSchema = new Schema(
  {
    username: { type: String, required: false, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true, unique: true },
    role: { type: String, required: false, default: Role.USER },
  },
  { timestamps: true, versionKey: false }
);

export default model<User>("User", userSchema);
