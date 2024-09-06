import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { Model, Types } from 'mongoose';
import * as sw from 'stopword';
import { CreateAlbumDto, UpdateAlbumDto } from './dto';
import { Album } from './schemas';

@Injectable()
export class AlbumService {
  constructor(
    @InjectModel(Album.name)
    private readonly albumModel: Model<Album>,
  ) {}

  async create(userId: Types.ObjectId, createAlbumDto: CreateAlbumDto) {
    const createdAlbum = await this.albumModel.create({
      ...createAlbumDto,
      userId: userId,
    });

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
    const foundAlbum = await this.albumModel.findById(id);

    if (!foundAlbum) throw new NotFoundException(`Album with ${id} not found`);

    return foundAlbum;
  }

  async findAllByUserId(userId: string) {
    const foundAlbums = await this.albumModel.find({ userId });
    return foundAlbums;
  }

  async searchAlbums(query: string) {
    const words = query.split(' ');
    const significantWords = sw.removeStopwords(words, sw.es); // 'sw.es' is the Spanish stopword list
    if (significantWords.length === 0) {
      return []; // Return an empty array if no significant words are left
    }
    const regexes = significantWords.map((word) => new RegExp(word, 'i'));

    const foundAlbums = await this.albumModel.find({
      $or: [
        { title: { $in: regexes } },
        { description: { $in: regexes } },
        { tags: { $in: regexes } },
      ],
    });
    return foundAlbums;
  }

  async findOneByCommentId(commentId: Types.ObjectId) {
    const albumFound = await this.albumModel.findOne({
      comments: {
        $elemMatch: { _id: commentId },
      },
    });

    if (!albumFound)
      throw new NotFoundException(
        `Album with comment id ${commentId} not found`,
      );

    return albumFound;
  }
}
