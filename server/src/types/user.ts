import { Document } from "mongoose";
import { Role } from "./role";

export interface User extends Document {
  id?: number;
  username: string;
  email: string;
  password: string;
  role?: Role;
}
