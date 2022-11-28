import { Controller, Get, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CreateSongDTO } from './dto/create.song.dto';
import { SongsService } from './songs.service';
@ApiTags('Musicas')
@Controller('songs')
export class SongsController {
  constructor(private readonly songsService: SongsService) {}

  @Get('/all')
  async getAllSongs() {
    return await this.songsService.all()
  }

  @Post('/create')
  async createSong(dto: CreateSongDTO){
    return await this.songsService.create(dto)
  }
}
