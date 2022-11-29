import { Body, Controller, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { AuthLoginDTO } from './dto/login.auth.dto';
import { RegisterAuthDTO } from './dto/register.auth.dto';

@ApiTags('Authentication')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/register')
  async registerWithUserCredentials(@Body() dto: RegisterAuthDTO) {
    return await this.authService.registerUser(dto);
  }

  @Post('/login')
  async loginWithUserCredentials(@Body() dto: AuthLoginDTO) {
    return await this.authService.loginCredentials(dto);
  }
}
