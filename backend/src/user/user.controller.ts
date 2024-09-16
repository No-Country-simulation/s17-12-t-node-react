import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  NotFoundException,
  HttpCode,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Auth, GetUser } from 'src/auth/decorators';
import { ObjectIdValidationPipe } from 'src/common/pipes/object-id-validation.pipe';
import mongoose, { Types } from 'mongoose';

@Controller('user')
@ApiTags('Users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  async create(@Body() createUserDto: CreateUserDto): Promise<User> {
    return this.userService.create(createUserDto);
  }

  @Get()
  async findAll(): Promise<User[]> {
    return this.userService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<User> {
    return this.userService.findOne(id);
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<User> {
    console.log(JSON.stringify(updateUserDto));
    return this.userService.update(id, updateUserDto);
  }

  @Delete(':id')
  @HttpCode(204)
  async remove(@Param('id') id: string): Promise<void> {
    const user = await this.userService.remove(id);
    if (!user) throw new NotFoundException('User not found');
    return;
  }

  @ApiBearerAuth()
  @Post('fav/:id')
  @Auth()
  async favUnFav(
    @GetUser() user: User,
    @Param('id', ObjectIdValidationPipe) albumId: mongoose.Types.ObjectId,
  ) {
    const userId = <mongoose.Types.ObjectId>user._id;
    return await this.userService.favUnFav(userId, albumId);
  }
}
