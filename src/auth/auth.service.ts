import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import axios from 'axios';
import { AuthLoginDto } from './dto/auth.login.dto';

@Injectable()
export class AuthService {
  constructor() {}

  async login(dto: AuthLoginDto) {
    try {
      const login = await axios.post(
        `${process.env.KEYCLOAK_URL}/realms/${process.env.KEYCLOAK_REALM}/protocol/openid-connect/token`,
        {
          ...dto,
          grant_type: 'password',
          client_id: `${process.env.KEYCLOAK_CLIENT_ID}`,
          client_secret: `${process.env.KEYCLOAK_SECRET}`,
          scope: 'openid',
        },
        {
          headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        },
      );
      return { access_token: login.data.access_token };
    } catch (error) {
      throw new HttpException('Credenciais invalidas', HttpStatus.BAD_REQUEST);
    }
  }
}
