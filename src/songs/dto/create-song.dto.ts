import { ApiProperty } from '@nestjs/swagger';

export class CreateSongDto {
  @ApiProperty()
  name: string;

  @ApiProperty()
  duration: string;
}
