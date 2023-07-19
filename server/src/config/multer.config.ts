import { MulterOptions } from '@nestjs/platform-express/multer/interfaces/multer-options.interface';
import { diskStorage } from 'multer';
import fs from 'fs';

export const multerConfig: MulterOptions = {
  limits: {
    fileSize: 1024 * 1024 * 5,
  },
  storage: diskStorage({
    destination: (req, file, next) => {
      fs.mkdir('/uploads', () => {
        next(null, 'uploads/');
      });
    },
    filename(req, file, callback) {
      const uniqSuf = `${file.originalname.split('.')[0]}-${Date.now()}`;
      const ext = file.mimetype.split('/')[1];

      callback(null, `${uniqSuf}.${ext}`);
    },
  }),
  fileFilter(
    req: Express.Request,
    file: Express.Multer.File,
    callback: (error: Error | null, acceptFile: boolean) => void
  ) {
    const fileTypes = /\.(png|jpe?g|gif|svg|webp|ico|avif)$/i;

    if (fileTypes.test(file.originalname)) {
      callback(null, true);
    } else {
      callback(null, false);
    }
  },
};
