import { CollectionService } from './services';
import { CollectionController } from './controllers';
import { Module } from '@nestjs/common';
import { CloudinaryModule } from '../modules/cloudinary';
import { ItemsModule } from './items/items.module';

@Module({
  imports: [CollectionsModule, CloudinaryModule, ItemsModule],
  controllers: [CollectionController],
  providers: [CollectionService],
})
export class CollectionsModule {}
