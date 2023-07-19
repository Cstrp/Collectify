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
  Query,
  UseGuards,
} from '@nestjs/common';
import { ItemService } from '../services/item.service';
import { JwtAuthGuard } from '../../../authentication/guards';
import { CollectionItemsDto } from '../dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Items')
@Controller('item')
export class ItemController {
  constructor(private readonly itemService: ItemService) {}

  @Get('all')
  @HttpCode(HttpStatus.OK)
  async getItems() {
    return await this.itemService.getItems();
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  @UseGuards(JwtAuthGuard)
  async getItem(@Param('id') id: string) {
    return await this.itemService.getItem(id);
  }

  @Post('create')
  @HttpCode(HttpStatus.CREATED)
  @UseGuards(JwtAuthGuard)
  async createItem(
    @Query('collectionId') id: string,
    @Body() dto: CollectionItemsDto
  ) {
    return await this.itemService.createItem(id, dto);
  }

  @Put('update/:id')
  @HttpCode(HttpStatus.OK)
  @UseGuards(JwtAuthGuard)
  async updateItem(@Param('id') id: string, @Body() dto: CollectionItemsDto) {
    return await this.itemService.updateItem(id, dto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  @UseGuards(JwtAuthGuard)
  public async deleteItem(@Param('id') id: string) {
    return await this.itemService.deleteItem(id);
  }
}
