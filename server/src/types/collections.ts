import { Document } from "mongoose";
import { Field } from "./field";
import { Items } from "./items";

export interface Collections extends Document {
  userId: string;
  name: string;
  description: string;
  theme: string;
  image?: string;
  fields: Field[];
  items: Items[];
}
