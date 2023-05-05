import { ApiProperty } from '@nestjs/swagger';

export class AuthLoginDto {
  @ApiProperty()
  username: string;

  @ApiProperty()
  password: string;
}
