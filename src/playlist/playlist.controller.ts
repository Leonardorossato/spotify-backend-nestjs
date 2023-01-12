import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  Req,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AddSongPlaylistDTO } from './dto/add.song.dto';
import { CreatePlaylistDTO } from './dto/create.playlist.dto';
import { UpdatePlaylistDTO } from './dto/update.platlist.dto';
import { PlaylistService } from './playlist.service';

@ApiBearerAuth()
@ApiTags('Playlist')
@Controller('playlist')
export class PlaylistController {
  constructor(private readonly playlistService: PlaylistService) {}

  @Get('/all')
  async all() {
    return await this.playlistService.all();
  }

  @Get('playlist/:search')
  async searchPartitionPlaylist(
    @Req() req,
    @Query('page') page: number,
    @Query('limit') limit: number,
    @Query('sort') sort: number,
  ) {
    return await this.playlistService.searchPartitionPlaylist(
      page,
      limit,
      sort,
      req,
    );
  }

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

  @Put('/playlist/:id')
  async updated(
    @Param('id') id: string,
    @Req() req,
    @Body() dto: UpdatePlaylistDTO,
  ) {
    return await this.playlistService.update(id, req, dto);
  }

  @Delete('/playlist/:id')
  async delete(@Param('id') id: string, @Req() req) {
    return await this.playlistService.remove(id, req);
  }
}
