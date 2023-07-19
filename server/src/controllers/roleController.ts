import { Request, Response } from "express";
import { errorHandler } from "../utils";

const checkRole = async (req: Request, res: Response) => {
  try {
    const user = req.user;

    if (!user) {
      errorHandler(res, 404, "User not found");
      return;
    }

    res.status(200).json({ user });
  } catch (error) {
    errorHandler(res, 500, `Internal Server Error ${error}`);
  }
};

export { checkRole };
