import dotenv from "dotenv";

dotenv.config();

// APP
const PORT: string | number = process.env.PORT || 3001;

// Mongoose
const DB_USER: string = process.env.DB_USER || "";
const DB_PASSWORD: string = process.env.DB_PASSWORD || "";

// ?
const SECRET_KEY: string = process.env.SECRET_KEY || "";
const JWT_EXPIRE_TIME = process.env.JWT_EXPIRE_TIME || "";

// Cloudinary
const CLOUD_NAME = process.env.CLOUD_NAME || "";
const API_KEY = process.env.API_KEY || "";
const API_SECRET = process.env.API_SECRET || "";

export {
  PORT,
  DB_USER,
  DB_PASSWORD,
  SECRET_KEY,
  API_SECRET,
  API_KEY,
  CLOUD_NAME,
  JWT_EXPIRE_TIME,
};
