import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class LikesDto {
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  id?: string;

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  userId?: string;

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  collectionItemId?: string;
}
