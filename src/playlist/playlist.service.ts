import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Users } from 'src/users/schema/users.schema';
import { AddSongPlaylistDTO } from './dto/add.song.dto';
import { CreatePlaylistDTO } from './dto/create.playlist.dto';
import { Playlist } from './schema/playlist.schema';

@Injectable()
export class PlaylistService {
  constructor(
    @InjectModel(Playlist.name)
    private readonly playlistModel: Model<Playlist>,

    @InjectModel(Users.name)
    private readonly usersModel: Model<Users>,
  ) {}

  async all(): Promise<Playlist[]> {
    try {
      const playlist = await this.playlistModel.find();
      return playlist;
    } catch (error) {
      throw new HttpException('Playlist not found', HttpStatus.NOT_FOUND);
    }
  }

  async create(dto: CreatePlaylistDTO, id: string) {
    try {
      const user = await this.usersModel.findOne({ _id: id });
      if (!user) {
        throw new HttpException(
          'User with this id not found',
          HttpStatus.NOT_FOUND,
        );
      }
      const playlist = await this.playlistModel.create({
        ...dto,
        songs: dto.songs,
        userId: dto.userId,
      });
      await playlist.save();
      return playlist;
    } catch (error) {
      throw new HttpException(
        'Can not create this playlist',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async addSong(id: string, dto: AddSongPlaylistDTO, req) {
    try {
      const user = await this.usersModel.findById({ _id: id });
      const playlist = await this.playlistModel.findOne({
        id: dto.playlistId,
      });
      if (!user.id && playlist.id) {
        throw new HttpException(
          'User dont create to add song to this playlist',
          HttpStatus.BAD_REQUEST,
        );
      }
      if (playlist.songs.indexOf(req.body.songId) === -1) {
        playlist.songs.push(req.body.songsId);
      }
      await this.playlistModel.create(dto);
      await playlist.save();
      return playlist;
    } catch (error) {
      throw new HttpException(
        'Erro to add song to playlist',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async findOneById(id: string) {
    try {
      const playlist = await this.playlistModel.findById({ _id: id });
      if (!playlist) {
        throw new HttpException(
          'Playlist with id no found',
          HttpStatus.NOT_FOUND,
        );
      }
      return playlist;
    } catch (error) {
      throw new HttpException('Error', HttpStatus.BAD_REQUEST);
    }
  }
}
