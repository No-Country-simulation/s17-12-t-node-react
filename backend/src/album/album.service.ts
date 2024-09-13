import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { Model, Types } from 'mongoose';
import * as sw from 'stopword';
import { CreateAlbumDto, UpdateAlbumDto } from './dto';
import { Album } from './schemas';
import { UserService } from '../user/user.service';

@Injectable()
export class AlbumService {
  constructor(
    @InjectModel(Album.name)
    private readonly albumModel: Model<Album>,
    private readonly userService: UserService,
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
    await this.userService.findOne(userId);

    const userIdToObjectId = new Types.ObjectId(userId);

    const foundAlbums = await this.albumModel
      .find({ userId: userIdToObjectId })
      .exec();

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

  async findAllAlbums() {
    const foundAllAlbums = await this.albumModel.find();
    return foundAllAlbums;
  }

  async likeDislike(userId: Types.ObjectId, id: string) {
    console.log(`user id is : ${JSON.stringify(userId)}`);
    const albumFound = await this.albumModel.findById(id);
    if (!albumFound) {
      throw new NotFoundException(`Album with id ${id} not found`);
    }

    /*  if (albumFound.likes.includes(userId)) {
      console.log('Hola!!!!');
      throw new ConflictException(`User ${userId} already likes this album`);
    } */
    const alreadyLiked = albumFound.likes.some((like) =>
      like.userId.equals(userId),
    );
    if (alreadyLiked) {
      //dislike
      const updatedAlbum = await this.albumModel.findByIdAndUpdate(
        id, // Album ID
        {
          $pull: { likes: { userId } }, // Add the userId to the likes array
        },
        { new: true }, // Return the updated document
      );
      return {
        message: 'Se ha dado dislike a esta porqueria!!!',
        data: updatedAlbum,
      };
    }
    //albumFound.likes.push(userId);
    const updatedAlbum = await this.albumModel.findByIdAndUpdate(
      id, // Album ID
      {
        $push: { likes: { userId } }, // Add the userId to the likes array
      },
      { new: true }, // Return the updated document
    );

    console.log(`album found is: ${JSON.stringify(albumFound)}`);
    //await albumFound.save();
    return {
      message:
        'Se ha dado like a esta porqueria que sigue siendo una porqueria!!!',
      data: updatedAlbum,
    };
  }
}
