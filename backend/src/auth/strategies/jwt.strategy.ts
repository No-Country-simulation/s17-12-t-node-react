import { Injectable, NotFoundException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';

import { InjectModel } from '@nestjs/mongoose';
import mongoose from 'mongoose';

import { ExtractJwt, Strategy } from 'passport-jwt';

import { type JwtPayload } from '../../auth/interfaces/jwt-payload.interface';
import { User, type User as UserType } from '../../user/entities/user.entity';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    @InjectModel(User.name)
    private userModel: mongoose.Model<User>,
    configService: ConfigService,
  ) {
    super({
      secretOrKey: configService.get('JWT_SECRET_KEY'),
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    });
  }

  async validate({ id }: JwtPayload) {
    const user = (await this.userModel.findById({ id })) as UserType;

    if (!user) throw new NotFoundException(`User with id ${id} not found`);

    return user;
  }
}
