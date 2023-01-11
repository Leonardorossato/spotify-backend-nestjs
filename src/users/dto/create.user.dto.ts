import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDTO {
  @ApiProperty({ nullable: false })
  name: string;

  @ApiProperty({ nullable: false })
  email: string;

  @ApiProperty({ nullable: false })
  cpf: string;

  @ApiProperty({ nullable: false })
  password: string;
}
