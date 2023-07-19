import { model, Schema } from "mongoose";
import { Items } from "../types";
import { likesSchema } from "./likes";
import { fieldSchema } from "./field";

const itemsSchema = new Schema(
  {
    collectionId: {
      type: Schema.Types.ObjectId,
      ref: "Collection",
      required: true,
    },
    title: { type: String, required: true },
    tags: { type: [String], required: true },
    image: { type: String, required: false },
    fields: { type: [fieldSchema], required: false },
    likes: { type: [likesSchema], required: false },
    comments: [{ type: Schema.Types.ObjectId, ref: "Comment" }],
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

export default model<Items>("Item", itemsSchema);
