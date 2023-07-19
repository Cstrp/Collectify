import { Schema } from "mongoose";

const likesSchema = new Schema(
  {
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    itemId: { type: Schema.Types.ObjectId, ref: "Item", required: true },
    isLiked: { type: Boolean, require: false, default: false },
  },
  { _id: false, timestamps: false, versionKey: false }
);

export { likesSchema };
