import { IsMongoId, IsNotEmpty, IsString, Length } from 'class-validator';
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

  @ApiProperty({
    description: 'ID of the album to which the comment is associated',
    example: '60d21b4667d0d8992e610c85',
  })
  @IsNotEmpty()
  @IsMongoId()
  albumId: string;
}
