import { CLOUDINARY } from '../../../shared/constants';
import { ConfigService } from '@nestjs/config';
import { v2 } from 'cloudinary';

export const CloudinaryProvider = {
  provide: CLOUDINARY,
  inject: [ConfigService],
  useFactory: (config: ConfigService) => {
    return v2.config({
      cloud_name: config.get('CLOUD_NAME'),
      api_key: config.get('API_KEY'),
      api_secret: config.get('API_SECRET'),
    });
  },
};
