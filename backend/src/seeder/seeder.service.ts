import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import mongoose from 'mongoose';

import { Album } from '../album/schemas';
import { User } from '../user/entities/user.entity';
import { AlbumService } from '../album/album.service';
import { UserService } from '../user/user.service';

import { ALBUMS, USERS } from './mocks/db.mock';
import { faker } from '@faker-js/faker';

@Injectable()
export class SeederService {
  constructor(
    @InjectModel(User.name) private userModel: mongoose.Model<User>,
    @InjectModel(Album.name) private albumModel: mongoose.Model<Album>,
    private readonly userService: UserService,
    private readonly albumService: AlbumService,
  ) {}

  async executeSeed() {
    // delete all albums
    await this.albumModel.deleteMany();

    // delete all users
    await this.userModel.deleteMany();

    // insert users
    const users = await this.insertUsers();

    // insert albums
    await this.insertAlbums(users);

    return 'Seed executed';
  }

  async insertUsers(): Promise<User[]> {
    const insertedUsers = await this.userModel.insertMany(USERS);

    return insertedUsers;
  }

  async insertAlbums(users: User[]) {
    const insertedAlbums = ALBUMS.map((album) => {
      const creator = users[Math.floor(Math.random() * users.length)];

      // Filter users to exclude the creator
      const otherUsers = users.filter(
        (user) => user._id.toString() !== creator._id.toString(),
      );

      // Generate likes and comments
      const likes = otherUsers.map((user) => ({
        userId: user._id,
        createdAt: new Date(),
      }));

      const comments = Array(3)
        .fill(null)
        .map(() => ({
          userId: otherUsers[Math.floor(Math.random() * otherUsers.length)]._id,
          content: faker.lorem.sentence(),
          createdAt: new Date(),
        }));

      return {
        ...album,
        userId: creator._id,
        likes,
        comments,
      };
    });

    await this.albumModel.insertMany(insertedAlbums);

    return insertedAlbums;
  }
}
