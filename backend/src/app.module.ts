import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AlbumModule } from './album/album.module';

import { UserModule } from './user/user.module';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './auth/auth.module';
import { SeederModule } from './seeder/seeder.module';
import { CommentModule } from './comment/comment.module';

@Module({
  imports: [
    ConfigModule.forRoot({ envFilePath: '.env', isGlobal: true }),
    MongooseModule.forRoot(process.env.DB_URI),

    UserModule,
    AlbumModule,
    AuthModule,

    // execute seed only in develop environment
    ...(process.env.NODE_ENV === 'development' ? [SeederModule] : []),

    CommentModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
