import { Response } from "express";

const errorHandler = (req: Response, statusCode: number, message: string) => {
  req.status(statusCode).json({ error: message });
};

export { errorHandler };
