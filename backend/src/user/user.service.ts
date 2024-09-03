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

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private userModel: mongoose.Model<User>,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    function extractUsername(emailString): string {
      // Use regular expression to find the username before "@"
      const username = emailString.split('@')[0];
      return username;
    }
    const res = await this.userModel.create({
      ...createUserDto,
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
      throw new NotFoundException('Task not found');
    }
    return user;
  }

  async update(id: string, updateUserDto: UpdateUserDto): Promise<User> {
    console.log(updateUserDto);
    console.log(id);
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
}
