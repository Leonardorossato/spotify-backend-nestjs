import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { PlaylistService } from './playlist.service';
import { CreatePlaylistDto } from './dto/create-playlist.dto';
import { UpdatePlaylistDto } from './dto/update-playlist.dto';
import dotenv from 'dotenv';
import { Roles } from 'nest-keycloak-connect';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
dotenv.config({ path: './.env' });

@Controller('playlist')
@ApiBearerAuth()
@ApiTags('Playlist')
export class PlaylistController {
  constructor(private readonly playlistService: PlaylistService) {}

  @Post('/create')
  @Roles({
    roles: [
      `realm:${process.env.KEYCLOAK_CLIENT_ID}-${process.env.KEYCLOAK_SUBGROUP_USER_ID}-create`,
    ],
  })
  async create(@Body() dto: CreatePlaylistDto) {
    return await this.playlistService.create(dto);
  }

  @Get('/all')
  @Roles({
    roles: [
      `realm:${process.env.KEYCLOAK_CLIENT_ID}-${process.env.KEYCLOAK_SUBGROUP_USER_ID}-read`,
    ],
  })
  async findAll() {
    return await this.playlistService.findAll();
  }

  @Get(':id')
  @Roles({
    roles: [
      `realm:${process.env.KEYCLOAK_CLIENT_ID}-${process.env.KEYCLOAK_SUBGROUP_USER_ID}-read`,
    ],
  })
  async findOne(@Param('id') id: number) {
    return await this.playlistService.findOne(id);
  }

  @Patch(':id')
  @Roles({
    roles: [
      `realm:${process.env.KEYCLOAK_CLIENT_ID}-${process.env.KEYCLOAK_SUBGROUP_USER_ID}-update`,
    ],
  })
  async update(
    @Param('id') id: number,
    @Body() updatePlaylistDto: UpdatePlaylistDto,
  ) {
    return await this.playlistService.update(id, updatePlaylistDto);
  }

  @Delete(':id')
  @Roles({
    roles: [
      `realm:${process.env.KEYCLOAK_CLIENT_ID}-${process.env.KEYCLOAK_SUBGROUP_USER_ID}-delete`,
    ],
  })
  async remove(@Param('id') id: number) {
    return await this.playlistService.remove(id);
  }
}
