import { Schema } from "mongoose";

const fieldSchema = new Schema(
  {
    type: { type: String, required: false },
    name: { type: String, required: false },
  },
  { _id: false, timestamps: false }
);

export { fieldSchema };
