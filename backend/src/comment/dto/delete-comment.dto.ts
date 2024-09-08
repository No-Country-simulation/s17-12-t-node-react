import { ApiProperty } from '@nestjs/swagger';
import { IsMongoId, IsNotEmpty } from 'class-validator';
import { Types } from 'mongoose';

export class DeleteCommentDto {
  @ApiProperty({
    description: 'ID of the album to which the comment is associated',
    example: '60d21b4667d0d8992e610c85',
  })
  @IsNotEmpty()
  @IsMongoId()
  albumId: Types.ObjectId;
}
