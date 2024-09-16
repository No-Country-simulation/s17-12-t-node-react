import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectModel } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { User } from './entities/user.entity';
import { HashAdapter } from 'src/common/adapters/hash.adapter';
import { Album } from 'src/album/schemas';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private userModel: mongoose.Model<User>,
    @InjectModel(Album.name) private albumModel: mongoose.Model<Album>, // This is the missing one
  ) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    function extractUsername(emailString): string {
      // Use regular expression to find the username before "@"
      const username = emailString.split('@')[0];
      return username;
    }

    const hashAdapter = new HashAdapter();
    const hashedPassword = hashAdapter.createHash(createUserDto.password, 10);

    const res = await this.userModel.create({
      ...createUserDto,
      password: hashedPassword,
      username: extractUsername(createUserDto.email),
    });
    return res;
  }

  async findAll(): Promise<User[]> {
    const users = await this.userModel.find();
    return users;
  }

  async findOne(id: string): Promise<User> {
    const isValidId = mongoose.isValidObjectId(id);
    if (!isValidId) {
      throw new BadRequestException('Please enter corrrect id');
    }
    const user = await this.userModel.findById(id);
    if (!user) {
      throw new NotFoundException(`User with id ${id} not found`);
    }
    return user;
  }

  async update(id: string, updateUserDto: UpdateUserDto): Promise<User> {
    return await this.userModel.findByIdAndUpdate(id, updateUserDto, {
      new: true,
      runValidators: true,
    });
  }

  async remove(id: string): Promise<User> {
    const res = await this.userModel.findByIdAndDelete(id);
    return res;
  }

  async findOneByEmail(email: string) {
    const userFound = await this.userModel.findOne({ email });

    if (!userFound)
      throw new NotFoundException(`User with email ${email} not exists`);

    return userFound;
  }

  async favUnFav(
    userId: mongoose.Types.ObjectId,
    albumId: mongoose.Types.ObjectId,
  ) {
    console.log(`user id is : ${JSON.stringify(userId)}`);
    const albumFound = await this.albumModel.findById(albumId);
    if (!albumFound) {
      throw new NotFoundException(`Album with id ${albumId} not found`);
    }

    const user = await this.userModel.findById(userId);
    const alreadyFav = user.favs.some((fav) => fav.equals(albumId));
    if (alreadyFav) {
      //unfav
      // Remove albumId from favs array using Mongoose's pull method
      user.favs = user.favs.filter((fav) => !fav.equals(albumId));

      // Save the updated user object
      await user.save();
      return {
        message: 'Se ha dado unfav a esta porqueria!!!',
        data: user,
      };
    }

    // Fav: Add albumId to favs
    user.favs.push(albumId);
    await user.save();

    console.log(`album found is: ${JSON.stringify(albumFound)}`);
    //await albumFound.save();
    return {
      message:
        'Se ha dado fav a esta porqueria que sigue siendo una porqueria!!!',
      data: user,
    };
  }
}
