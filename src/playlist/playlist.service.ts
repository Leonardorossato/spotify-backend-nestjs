import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreatePlaylistDto } from './dto/create-playlist.dto';
import { UpdatePlaylistDto } from './dto/update-playlist.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Playlist } from './entities/playlist.entity';
import { Repository } from 'typeorm';
import { Song } from '@/songs/entities/song.entity';

@Injectable()
export class PlaylistService {
  constructor(
    @InjectRepository(Playlist)
    private readonly playlistRepository: Repository<Playlist>,
    @InjectRepository(Song)
    private readonly songRepository: Repository<Song>,
  ) {}

  async create(dto: CreatePlaylistDto) {
    try {
      const playlist = await this.playlistRepository.create(dto);
      await this.playlistRepository.save(playlist);
      return playlist;
    } catch (error) {
      throw new HttpException(
        'Error creating playlist',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async findAll() {
    try {
      const playlist = await this.playlistRepository.find();
      return playlist;
    } catch (error) {
      throw new HttpException(
        'Error to find all playlists',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async findOne(id: number) {
    try {
      const playlist = await this.playlistRepository.findOneBy({ id: id });
      if (!playlist) {
        throw new HttpException(
          `Error find a playlist with this id: ${id}`,
          HttpStatus.NOT_FOUND,
        );
      }
      return playlist;
    } catch (error) {
      throw new HttpException(
        `Error to find playlist with this id: ${id}`,
        HttpStatus.NOT_FOUND,
      );
    }
  }

  async update(id: number, dto: UpdatePlaylistDto) {
    try {
      const playlist = await this.playlistRepository.findOneBy({ id: id });
      const song = await this.songRepository.findOneBy({
        id: playlist?.songId,
      });
      if (song?.id) {
        throw new HttpException(
          `Error to update playlist with this song id: ${song.id}`,
          HttpStatus.NOT_FOUND,
        );
      }
      await this.playlistRepository.update(id, dto);
      return playlist;
    } catch (error) {
      throw new HttpException(
        `Error to update playlist with this id: ${id}`,
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async remove(id: number) {
    try {
      const playlist = await this.playlistRepository.findOneBy({ id: id });
      if (!playlist) {
        throw new HttpException(
          'Error find a playlist with this id: ${id}',
          HttpStatus.NOT_FOUND,
        );
      }
      await this.playlistRepository.delete(playlist);
      return { message: `Playlist deleted successfully` };
    } catch (error) {
      throw new HttpException(
        `Error to remove playlist with this id: ${id}`,
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}
