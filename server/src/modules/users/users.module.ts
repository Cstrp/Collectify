import { Global, Module } from '@nestjs/common';
import { UsersService } from './services';

@Global()
@Module({
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule {}
