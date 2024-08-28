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
import { ObjectIdValidationPipe } from 'src/common/pipes/object-id-validation.pipe';

@Controller('album')
export class AlbumController {
  constructor(private readonly albumService: AlbumService) { }

  @Get(':id')
  async findOne(@Param('id', ObjectIdValidationPipe) id: string) {
    return await this.albumService.findOneById(id);
  }

  @Post()
  async create(@Body() createAlbumDto: CreateAlbumDto) {
    return await this.albumService.create(createAlbumDto);
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
