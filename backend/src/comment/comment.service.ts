import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import mongoose, { Model, Types } from 'mongoose';

import { CreateCommentDto, UpdateCommentDto } from './dto';
import { AlbumService } from '../album/album.service';
import { Album } from '../album/schemas';

@Injectable()
export class CommentService {
  constructor(
    private readonly albumService: AlbumService,
    @InjectModel(Album.name)
    private readonly albumModel: Model<Album>,
  ) {}

  async create(userId: Types.ObjectId, createCommentDto: CreateCommentDto) {
    const { albumId, content } = createCommentDto;

    await this.albumService.findOneById(albumId);

    await this.albumModel.findByIdAndUpdate(albumId, {
      $push: { comments: { userId, content } },
    });
  }

  findAll() {
    return `This action returns all comment`;
  }

  findOne(id: number) {
    return `This action returns a #${id} comment`;
  }

  async update(commentId: Types.ObjectId, updateCommentDto: UpdateCommentDto) {
    // const { content } = updateCommentDto;
    // const albumFound = await this.albumService.findOneByCommentId(commentId);
    // const albumObj = albumFound.toObject();
    // const updatedComments = albumObj.comments.map((comment) => {
    //   if (comment._id.equals(commentId)) {
    //     return { ...comment, content };
    //   }
    //   return comment;
    // });
    // albumFound.comments = updatedComments;
    // await albumFound.save();
    // return albumFound;
  }

  remove(id: number) {
    return `This action removes a #${id} comment`;
  }
}
