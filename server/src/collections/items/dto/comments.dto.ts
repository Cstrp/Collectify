import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CommentsDto {
  @IsString()
  @IsOptional()
  @IsNotEmpty()
  id?: string;

  @IsString()
  @IsNotEmpty()
  content: string;

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  userId?: string;

  @IsString()
  @IsNotEmpty()
  collectionItemId?: string;
}
