import { Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthLoginDto } from './dto/auth.login.dto';
import { Public } from 'nest-keycloak-connect';
import { ApiTags } from '@nestjs/swagger';

@Controller('auth')
@ApiTags('Autenticação')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @Post('/login')
  async login(dto: AuthLoginDto) {
    return await this.authService.login(dto);
  }
}
