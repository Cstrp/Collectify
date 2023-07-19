import jwt from "jsonwebtoken";
import { JWT_EXPIRE_TIME, SECRET_KEY } from "../config";

const generateToken = (id: number | string, email: string) => {
  return jwt.sign({ email, id }, SECRET_KEY, {
    expiresIn: JWT_EXPIRE_TIME,
  });
};

export { generateToken };
