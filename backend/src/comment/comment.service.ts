import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { Model, Types } from 'mongoose';

import { CreateCommentDto, UpdateCommentDto } from './dto';
import { AlbumService } from '../album/album.service';
import { Album } from '../album/schemas';
import { CommentType } from '../interfaces/comment.interface';

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

  async update(
    userId: Types.ObjectId,
    commentId: Types.ObjectId,
    updateCommentDto: UpdateCommentDto,
  ) {
    const { content, albumId } = updateCommentDto;

    const albumFound = await this.albumService.findOneById(albumId);
    const userIdToObject = new Types.ObjectId(userId);
    const commentFound = this.findCommentById(albumFound, commentId);

    if (!commentFound.userId.equals(userIdToObject))
      throw new UnauthorizedException('You cant edit this comment');

    await this.albumModel.updateOne(
      { _id: albumId, 'comments._id': commentId },
      {
        $set: {
          'comments.$.content': content,
        },
      },
    );

    const updatedAlbum = await this.albumService.findOneById(albumId);
    const updatedComment = this.findCommentById(
      updatedAlbum,
      commentId,
    ) as CommentType;

    return {
      userId: updatedComment.userId,
      content: updatedComment.content,
      _id: updatedComment._id,
      createdAt: updatedComment?.createdAt,
      updatedAt: updatedComment?.updatedAt,
    };
  }

  async delete(
    userId: Types.ObjectId,
    commentId: Types.ObjectId,
    albumId: Types.ObjectId,
  ) {
    const userIdToObject = new Types.ObjectId(userId);

    const albumFound = await this.albumService.findOneById(albumId.toString());
    const commentFound = this.findCommentById(albumFound, commentId);

    if (!commentFound.userId.equals(userIdToObject)) {
      throw new UnauthorizedException("You can't delete this comment");
    }

    await this.albumModel.updateOne(
      { _id: albumId },
      { $pull: { comments: { _id: commentId } } },
    );

    return { message: 'Comment successfully deleted' };
  }

  // comments
  private findCommentById(album: Album, commentId: Types.ObjectId) {
    const commentFound = album.comments.find(
      (comment) => comment.id === commentId,
    );

    if (!commentFound)
      throw new NotFoundException(`Comment with id ${commentId} not found`);

    return commentFound;
  }
}
