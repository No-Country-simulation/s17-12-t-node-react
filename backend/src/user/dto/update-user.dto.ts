import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';
import { IsBoolean, IsEmail, IsOptional, IsString } from 'class-validator';
import { ApiProperty, ApiBody } from '@nestjs/swagger';
export class UpdateUserDto extends PartialType(CreateUserDto) {
  @IsOptional()
  @IsString()
  username: string;
  @IsOptional()
  @IsString()
  firstname: string;
  @IsOptional()
  @IsString()
  lastname: string;
  @IsOptional()
  @IsString()
  @IsEmail()
  email: string;
  @IsOptional()
  @IsString()
  password: string;
  @IsOptional()
  @IsString()
  country: string;
  @IsOptional()
  tags: [string];
  @IsOptional()
  @IsBoolean()
  isAdmin: boolean;
  @IsOptional()
  @IsString()
  description: string;
  @IsOptional()
  @IsString()
  imageUrl: string;
}
