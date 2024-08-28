import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { Model } from 'mongoose';

import { CreateAlbumDto, UpdateAlbumDto } from './dto';
import { Album } from './schemas';

@Injectable()
export class AlbumService {
  constructor(
    @InjectModel(Album.name)
    private readonly albumModel: Model<Album>,
  ) { }

  async create(createAlbumDto: CreateAlbumDto) {
    const createdAlbum = await this.albumModel.create(createAlbumDto);
    return createdAlbum;
  }

  async update(id: string, updateAlbumDto: UpdateAlbumDto) {
    await this.findOneById(id);

    const updatedAlbum = await this.albumModel.findByIdAndUpdate(
      id,
      updateAlbumDto,
      { new: true },
    );

    return updatedAlbum;
  }

  async delete(id: string) {
    await this.findOneById(id);
    await this.albumModel.findByIdAndDelete(id);
  }

  async findOneById(id: string) {
    const foundedAlbum = await this.albumModel.findById(id);

    if (!foundedAlbum)
      throw new NotFoundException(`Album with ${id} not found`);

    return foundedAlbum;
  }
}
