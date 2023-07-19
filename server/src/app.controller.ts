import {
  Controller,
  ForbiddenException,
  HttpCode,
  HttpStatus,
  Post,
  Req,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { CloudinaryService } from './modules/cloudinary/services';
import { Request } from 'express';
import { JwtAuthGuard } from './authentication/guards';
import { FileInterceptor } from '@nestjs/platform-express';
import { multerConfig } from './config';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Cloudinary')
@Controller('')
export class AppController {
  constructor(private readonly cloudinaryService: CloudinaryService) {}

  @Post('upload')
  @HttpCode(HttpStatus.OK)
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(FileInterceptor('image', multerConfig))
  public async uploadImage(@Req() req: Request): Promise<{ imageUrl: string }> {
    if (req.file) {
      return {
        imageUrl: await this.cloudinaryService.uploadImage(req.file.path),
      };
    }

    throw new ForbiddenException('Image upload failed');
  }
}
