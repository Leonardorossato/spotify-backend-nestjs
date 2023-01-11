import { Body, Controller, Param, Post, Put, Req } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AddSongPlaylistDTO } from './dto/add.song.dto';
import { CreatePlaylistDTO } from './dto/create.playlist.dto';
import { PlaylistService } from './playlist.service';

@ApiBearerAuth()
@ApiTags('Playlist')
@Controller('playlist')
export class PlaylistController {
  constructor(private readonly playlistService: PlaylistService) {}

  @Post('/create')
  async create(@Param('id') id: string, @Body() dto: CreatePlaylistDTO) {
    return await this.playlistService.create(dto, id);
  }

  @Put('/addSong')
  async addSongToPlaylist(
    @Param('id') id: string,
    @Body() dto: AddSongPlaylistDTO,
    @Req() req,
  ) {
    return await this.playlistService.addSong(id, dto, req);
  }
}
