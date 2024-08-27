import {
  IsBoolean,
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateUserDto {
  @IsOptional()
  @IsString()
  firstname: string;
  @IsOptional()
  @IsString()
  lastname: string;
  @IsNotEmpty()
  @IsString()
  @IsEmail()
  email: string;
  @IsNotEmpty()
  @IsString()
  password: string;
  @IsOptional()
  @IsString()
  country: string;
  @IsOptional()
  tags: [string];
  @IsNotEmpty()
  @IsBoolean()
  isAdmin: boolean;
  @IsOptional()
  @IsString()
  description: string;
  @IsOptional()
  @IsString()
  imageUrl: string;
}
