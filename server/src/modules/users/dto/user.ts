import {
  IsDate,
  IsEmail,
  IsOptional,
  IsString,
  Max,
  Min,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class User implements User {
  @ApiProperty({
    description: 'Unique id of the user',
    nullable: false,
    required: false,
  })
  @IsOptional()
  @IsString()
  id?: string;

  @ApiProperty({
    description: 'Username of the user',
    nullable: true,
    required: false,
  })
  @IsOptional()
  @IsString()
  username?: string;

  @ApiProperty({
    description: 'Email of the user',
    nullable: false,
    required: true,
  })
  @IsEmail()
  @IsString()
  email: string;

  @ApiProperty({
    description: 'Password of the user',
    nullable: false,
    required: true,
  })
  @IsString()
  @Min(6)
  @Max(16)
  password: string;

  @ApiProperty({
    description: 'Avatar of the user',
    nullable: true,
    required: false,
  })
  @IsOptional()
  @IsString()
  avatar?: string;

  @ApiProperty({
    description: 'User role',
    nullable: false,
    enum: ['USER', 'ADMIN'],
    required: false,
  })
  @IsOptional()
  @IsString()
  role?: 'USER' | 'ADMIN';

  @ApiProperty({
    description: 'Date of the user creation',
    nullable: false,
    required: false,
  })
  @IsOptional()
  @IsDate()
  createdAt?: Date;

  @ApiProperty({
    description: 'Date of the user Update',
    nullable: false,
    required: false,
  })
  @IsOptional()
  @IsDate()
  updatedAt?: Date;
}
