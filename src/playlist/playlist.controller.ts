import { Body, Controller, Post, Req } from '@nestjs/common';
import { ApiBearerAuth } from '@nestjs/swagger';
import { CreatePlaylistDTO } from './dto/create.playlist.dto';
import { PlaylistService } from './playlist.service';
@ApiBearerAuth()
@Controller('playlist')
export class PlaylistController {
  constructor(private readonly playlistService: PlaylistService) {}

  @Post('/create')
  async create(@Req() req, @Body() dto: CreatePlaylistDTO){
    return await this.playlistService.create(dto, req);
  }
}
