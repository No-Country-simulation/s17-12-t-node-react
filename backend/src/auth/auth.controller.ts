import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginCredentialsDto } from './dto/login-credentials.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @Post('credentials')
  async loginWithCredentials(
    @Body() loginWithCredentials: LoginCredentialsDto,
  ) {
    return await this.authService.login(loginWithCredentials);
  }
}
