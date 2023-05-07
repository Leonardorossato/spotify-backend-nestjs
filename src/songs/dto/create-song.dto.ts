import { ApiProperty } from '@nestjs/swagger';

export class CreateSongDto {
  @ApiProperty()
  name!: string;

  @ApiProperty()
  artist!: string;

  @ApiProperty()
  duration!: string;
}
