import { Injectable } from '@nestjs/common';
import { v2 } from 'cloudinary';

@Injectable()
export class CloudinaryService {
  public async uploadImage(file: string) {
    try {
      const res = await v2.uploader.upload(file, {
        use_filename: true,
        colors: true,
        resource_type: 'auto',
      });

      return res.secure_url;
    } catch (error) {
      console.log('Failed to upload.ts image: ', error);
    }
  }
}
