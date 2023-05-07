import { Body, Controller, Get, Post } from '@nestjs/common';
import { CreateSongDto } from './dto/create-song.dto';
import { SongsService } from './songs.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Roles } from 'nest-keycloak-connect';
import dotenv from 'dotenv';
dotenv.config({ path: './.env' });
@Controller('songs')
@ApiBearerAuth()
@ApiTags('Musicas')
export class SongsController {
  constructor(private readonly songsService: SongsService) {}

  @Post('/create')
  @Roles({
    roles: [
      `realm:${process.env.KEYCLOAK_CLIENT_ID}-${process.env.KEYCLOAK_SUBGROUP_MUSICIAN_ID}-create`,
    ],
  })
  async create(@Body() createSongDto: CreateSongDto) {
    return await this.songsService.create(createSongDto);
  }

  @Get('/all')
  @Roles({
    roles: [
      `realm:${process.env.KEYCLOAK_CLIENT_ID}-${process.env.KEYCLOAK_SUBGROUP_MUSICIAN_ID}-read`,
    ],
  })
  async findAll() {
    return await this.songsService.findAll();
  }
}
