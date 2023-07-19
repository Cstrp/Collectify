import { model, Schema } from "mongoose";
import { Comment } from "../types";

const commentSchema = new Schema(
  {
    itemId: { type: Schema.Types.ObjectId, ref: "Item", required: true },
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    content: { type: String, required: true },
  },
  { timestamps: true, versionKey: false }
);

export default model<Comment>("Comment", commentSchema);
