import { ApiProperty } from '@nestjs/swagger';

export class CreatePlaylistDTO {
  @ApiProperty({ nullable: false, minLength: 3, maxLength: 250 })
  name: string;

  @ApiProperty({ nullable: false })
  userId: number;

  @ApiProperty({ nullable: false })
  description: string;

  @ApiProperty({ nullable: true, type: Array, default: [] })
  songs: []

  @ApiProperty({ nullable: false })
  img: string;
}
