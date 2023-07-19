import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Put,
  Req,
  UseGuards,
} from '@nestjs/common';
import { CollectionService } from '../services';
import { JwtAuthGuard } from '../../authentication/guards';
import { CreateCollectionDto } from '../dto';
import { Request } from 'express';
import { User } from '../../shared';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Collections')
@Controller('collections')
export class CollectionController {
  constructor(private readonly collectionService: CollectionService) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  async getCollections() {
    return await this.collectionService.getCollections();
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  @UseGuards(JwtAuthGuard)
  async getCollection(@Param('id') id: string, @Req() req: Request) {
    const user = req.user as User;
    return await this.collectionService.getCollectionById(id, user.id);
  }

  @Post('create')
  @HttpCode(HttpStatus.CREATED)
  @UseGuards(JwtAuthGuard)
  async createCollection(
    @Body() dto: CreateCollectionDto,
    @Req() req: Request
  ) {
    return await this.collectionService.create(req, dto);
  }

  @Put('update/:id')
  @HttpCode(HttpStatus.OK)
  @UseGuards(JwtAuthGuard)
  async updateCollection(
    @Param('id') id: string,
    @Body() dto: CreateCollectionDto
  ) {
    return await this.collectionService.update(id, dto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  async deleteCollection(@Param('id') id: string) {
    return await this.collectionService.deleteCollection(id);
  }
}
