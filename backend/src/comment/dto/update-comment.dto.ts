import { IsNotEmpty, IsString, Length } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateCommentDto {
  @ApiProperty({
    description: 'Content of the comment',
    example: 'This is a sample comment.',
    maxLength: 500,
    minLength: 1,
  })
  @IsNotEmpty()
  @IsString()
  @Length(1, 500)
  content: string;
}
