import { model, Schema } from "mongoose";
import { Collections } from "../types";
import { fieldSchema } from "./field";

const collectionSchema = new Schema(
  {
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    name: { type: String, required: true },
    description: { type: String, required: true },
    theme: { type: String, required: true },
    image: { type: String, required: false },
    fields: { type: [fieldSchema], required: false },
    items: [{ type: Schema.Types.ObjectId, ref: "Item" }],
  },
  { versionKey: false, timestamps: true }
);

export default model<Collections>("Collections", collectionSchema);
