import multer from "multer";
import * as fs from "fs";
import { Request } from "express";

const storage = multer.diskStorage({
  destination: (req, file, next) => {
    fs.mkdir("/static", () => {
      next(null, "static/");
    });
  },
  filename(req, file, callback) {
    const ext = file.mimetype.split("/")[1];

    callback(null, `${file.originalname}-${Date.now()}.${ext}`);
  },
});

const fileFilter = (
  req: Request,
  file: Express.Multer.File,
  callback: multer.FileFilterCallback
) => {
  const fileTypes = /\.(png|jpe?g|gif|svg|webp|ico|avif)$/i;

  if (fileTypes) {
    callback(null, true);
  } else {
    callback(null, false);
  }
};

const limits = {
  fileSize: 1024 * 1024 * 5,
};

export const upload = multer({ storage, fileFilter, limits });
