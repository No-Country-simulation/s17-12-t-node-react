import { Controller, Post, Body, Patch, Param, Delete } from '@nestjs/common';

import { CommentService } from './comment.service';
import { CreateCommentDto, UpdateCommentDto } from './dto';
import { Auth, GetUser } from '../auth/decorators';
import { User } from '../user/entities/user.entity';
import { Types } from 'mongoose';
import { ApiBearerAuth } from '@nestjs/swagger';
import { ObjectIdValidationPipe } from 'src/common/pipes/object-id-validation.pipe';

//! refactor in the future
type UserTemporalType = User & { _id: Types.ObjectId };

@Controller('comment')
export class CommentController {
  constructor(private readonly commentService: CommentService) { }

  @ApiBearerAuth()
  @Auth()
  @Post()
  async create(
    @GetUser() user: UserTemporalType,
    @Body() createCommentDto: CreateCommentDto,
  ) {
    return await this.commentService.create(user._id, createCommentDto);
  }

  @Patch(':id')
  async update(
    @Param('id', ObjectIdValidationPipe) id: Types.ObjectId,
    @Body() updateCommentDto: UpdateCommentDto,
  ) {
    return await this.commentService.update(id, updateCommentDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.commentService.remove(+id);
  }
}
