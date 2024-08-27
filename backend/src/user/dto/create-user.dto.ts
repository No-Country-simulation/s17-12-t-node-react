import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty()
  @IsString()
  username: string;
  @IsOptional()
  @IsString()
  firstname: string;
  @IsOptional()
  @IsString()
  lastname: string;
  @IsNotEmpty()
  @IsString()
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
  @IsString()
  isAdmin: boolean;
  @IsOptional()
  @IsString()
  description: string;
  @IsOptional()
  @IsString()
  imageUrl: string;
}
