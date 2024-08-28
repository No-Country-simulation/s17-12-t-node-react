import {
  Controller,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Get,
} from '@nestjs/common';

import { AlbumService } from './album.service';
import { CreateAlbumDto, UpdateAlbumDto } from './dto';
import { ObjectIdValidationPipe } from '../common/pipes/object-id-validation.pipe';
import { Types } from 'mongoose';

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

  @Post()
  async create(@Body() createAlbumDto: CreateAlbumDto) {
    const userId = new Types.ObjectId('66cea5e3d77c7eeb9de94df5');

    return await this.albumService.create(userId, createAlbumDto);
  }

  @Patch(':id')
  async update(
    @Param('id', ObjectIdValidationPipe) id: string,
    @Body() updateAlbumDto: UpdateAlbumDto,
  ) {
    return await this.albumService.update(id, updateAlbumDto);
  }

  @Delete(':id')
  async delete(@Param('id', ObjectIdValidationPipe) id: string) {
    return await this.albumService.delete(id);
  }
}
