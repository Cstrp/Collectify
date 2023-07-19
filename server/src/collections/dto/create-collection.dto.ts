import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateCollectionDto {
  @IsOptional()
  @IsString()
  id?: string;

  @IsNotEmpty()
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsNotEmpty()
  @IsString()
  @IsNotEmpty()
  description: string;

  @IsOptional()
  @IsString()
  theme?: string;

  @IsOptional()
  @IsString()
  image?: string;

  @IsOptional()
  fields?: { type: string; value: string }[];

  @IsNotEmpty()
  @IsString()
  @IsOptional()
  userId: string;
}
