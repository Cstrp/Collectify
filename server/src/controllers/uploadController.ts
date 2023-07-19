import { Request, Response } from "express";
import { errorHandler } from "../utils";
import { uploadImage as upload } from "../utils/uploadImage";

const uploadImgResp = async (req: Request, res: Response) => {
  try {
    const file = req.file;

    if (file) {
      const fileUrl = await upload(file.path);
      res
        .status(200)
        .json({ message: "Uploaded file successfully", imageUrl: fileUrl });
    } else {
      res.status(400).json({ message: "No file found" });
    }
  } catch (error) {
    errorHandler(res, 500, `Internal Server Error ${error}`);
  }
};

export { uploadImgResp };
