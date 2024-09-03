import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { LoginCredentialsDto } from './dto/login-credentials.dto';
import { HashAdapter } from '../common/adapters/hash.adapter';
import { UserService } from '../user/user.service';
import { JwtPayload } from './interfaces/jwt-payload.interface';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) { }

  async login({ email, password }: LoginCredentialsDto) {
    const userFound = await this.userService.findOneByEmail(email);

    const hashAdapter = new HashAdapter();

    const isPasswordMatch = hashAdapter.verifyHash(
      password,
      userFound.password,
    );

    if (!isPasswordMatch) throw new UnauthorizedException('Incorrect password');

    const token = this.getJwt({ id: userFound.id });

    return {
      id: userFound._id,
      name: `${userFound.firstname} ${userFound.lastname}`,
      username: userFound.username,
      isAdmin: userFound.isAdmin,
      email: userFound.email,
      token,
    };
  }

  private getJwt(payload: JwtPayload) {
    const token = this.jwtService.sign(payload);
    return token;
  }
}
