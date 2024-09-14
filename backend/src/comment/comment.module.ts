import { Module } from '@nestjs/common';
import { CommentService } from './comment.service';
import { CommentController } from './comment.controller';
import { AlbumModule } from 'src/album/album.module';

@Module({
  imports: [AlbumModule],
  controllers: [CommentController],
  providers: [CommentService],
})
export class CommentModule { }
