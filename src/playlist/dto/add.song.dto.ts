import { ApiProperty } from '@nestjs/swagger';

export class AddSongPlaylistDTO {
  @ApiProperty({ nullable: false })
  userId: number;

  @ApiProperty({ nullable: false })
  playlistId: number;

  @ApiProperty({ nullable: false })
  songsId: string;
}
