import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';

import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Types } from 'mongoose';

import { GetUser } from '../auth/decorators';
import { type User } from '../user/entities/user.entity';
import { Auth } from '../auth/decorators/auth.decorator';
import { ObjectIdValidationPipe } from '../common/pipes/object-id-validation.pipe';
import { AlbumService } from './album.service';
import { CreateAlbumDto, UpdateAlbumDto } from './dto';

//! refactor in the future
type UserTemporalType = User & { _id: Types.ObjectId };

@ApiTags('Album')
@Controller('album')
export class AlbumController {
  constructor(private readonly albumService: AlbumService) { }

  @Get(':id')
  async findOne(@Param('id', ObjectIdValidationPipe) id: string) {
    return await this.albumService.findOneById(id);
  }

  @Get('user/:userId')
  async findAll(@Param('userId', ObjectIdValidationPipe) userId: string) {
    return await this.albumService.findAllByUserId(userId);
  }

  @ApiBearerAuth()
  @Post()
  @Auth()
  async create(
    @GetUser() user: UserTemporalType,
    @Body() createAlbumDto: CreateAlbumDto,
  ) {
    return await this.albumService.create(user._id, createAlbumDto);
  }

  @ApiBearerAuth()
  @Patch(':id')
  @Auth()
  async update(
    @Param('id', ObjectIdValidationPipe) id: string,
    @Body() updateAlbumDto: UpdateAlbumDto,
  ) {
    return await this.albumService.update(id, updateAlbumDto);
  }

  @ApiBearerAuth()
  @Delete(':id')
  @Auth()
  async delete(@Param('id', ObjectIdValidationPipe) id: string) {
    return await this.albumService.delete(id);
  }
}
