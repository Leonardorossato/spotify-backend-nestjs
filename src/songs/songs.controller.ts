import { Body, Controller, Get, Post } from '@nestjs/common';
import { CreateSongDto } from './dto/create-song.dto';
import { SongsService } from './songs.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Roles } from 'nest-keycloak-connect';

@Controller('songs')
@ApiTags('Musicas')
@ApiBearerAuth()
export class SongsController {
  constructor(private readonly songsService: SongsService) {}

  @Post('/create')
  create(@Body() createSongDto: CreateSongDto) {
    return this.songsService.create(createSongDto);
  }

  @Get('/all')
  @Roles({ roles: [`realm:${process.env.KEYCLOAK_CLIENT_ID}:musician-read`] })
  async findAll() {
    return await this.songsService.findAll();
  }
}
