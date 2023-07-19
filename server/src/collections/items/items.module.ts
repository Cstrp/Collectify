import { Module } from '@nestjs/common';
import { ItemController } from './controllers/item.controller';
import { ItemService } from './services/item.service';

@Module({
  controllers: [ItemController],
  providers: [ItemService],
  exports: [ItemService],
})
export class ItemsModule {}
