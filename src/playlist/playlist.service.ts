import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UsersService } from 'src/users/users.service';
import { Repository } from 'typeorm';
import { AddSongPlaylistDTO } from './dto/add.song.dto';
import { CreatePlaylistDTO } from './dto/create.playlist.dto';
import { Playlist } from './entities/playlist.entity';

@Injectable()
export class PlaylistService {
  constructor(
    @InjectRepository(Playlist)
    private readonly playlistRepository: Repository<Playlist>,
    private readonly userService: UsersService
  ) {}

  async all(): Promise<Playlist[]> {
    try {
      const playlist = await this.playlistRepository.find();
      return playlist;
    } catch (error) {
      throw new HttpException('Playlist not found', HttpStatus.NOT_FOUND);
    }
  }

  async create(dto: CreatePlaylistDTO, id: number) {
    try {
      const user = await this.userService.findOneById(id);
      if (!user) {
        throw new HttpException(
          'User with this id not found',
          HttpStatus.NOT_FOUND,
        );
      }
      const playlist = await this.playlistRepository.save({
        ...dto,
        songs: dto.songs,
        userId: dto.userId,
      });
      return playlist;
    } catch (error) {
      throw new HttpException(
        'Can not create this playlist',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async addSong(id: number, dto: AddSongPlaylistDTO, req) {
    try {
      const user = await this.userService.findOneById(id);
      const playlist = await this.playlistRepository.findOneBy({id: dto.playlistId});
      if (!user.id && playlist.id) {
        throw new HttpException(
          'User dont create to add song to this playlist',
          HttpStatus.BAD_REQUEST,
        );
      }
      if (playlist.songs.indexOf(req.body.songId) === -1) {
        playlist.songs.push(req.body.songsId)
      }
      await this.playlistRepository.save(dto)
      return playlist
    } catch (error) {
      throw new HttpException('Erro to add song to playlist', HttpStatus.BAD_REQUEST)
    }
  }

  async findOneById(id: number){
    try {
      const playlist = await this.playlistRepository.findOneBy({id: id})
      if (!playlist) {
        throw new HttpException('Playlist with id no found', HttpStatus.NOT_FOUND)
      }
      return playlist;
    } catch (error) {
      throw new HttpException('Error', HttpStatus.BAD_REQUEST)
    }
  }
}
