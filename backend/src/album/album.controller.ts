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
import { Auth } from '../auth/decorators/auth.decorator';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

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
  async create(@Body() createAlbumDto: CreateAlbumDto) {
    const userId = new Types.ObjectId('66cea5e3d77c7eeb9de94df5');

    return await this.albumService.create(userId, createAlbumDto);
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
