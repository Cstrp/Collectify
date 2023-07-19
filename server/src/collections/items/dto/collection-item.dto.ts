import {
  ArrayMinSize,
  IsArray,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';
import { CommentsDto } from './comments.dto';
import { LikesDto } from './likes.dto';

export class CollectionItemsDto {
  @IsOptional()
  @IsString()
  id?: string;

  @IsString()
  @IsNotEmpty()
  title: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  description?: string;

  @IsOptional()
  fields?: { type: string; value: string }[];

  @IsArray()
  @IsString({ each: true })
  @ArrayMinSize(1)
  @IsOptional()
  tags?: string[];

  @IsOptional()
  @IsString()
  comments?: CommentsDto[];

  @IsOptional()
  likes?: LikesDto[];
}
