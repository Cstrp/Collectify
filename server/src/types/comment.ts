import { Document } from "mongoose";

export interface Comment extends Document {
  itemId: string;
  userId: string;
  content: string;
}
