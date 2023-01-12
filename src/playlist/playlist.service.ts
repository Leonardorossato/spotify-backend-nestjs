import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Users } from 'src/users/schema/users.schema';
import { AddSongPlaylistDTO } from './dto/add.song.dto';
import { CreatePlaylistDTO } from './dto/create.playlist.dto';
import { UpdatePlaylistDTO } from './dto/update.platlist.dto';
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

  async searchPartitionPlaylist(req, page: number, limit: number, sort: number) {
    try {
      let { page, limit, sort, asc } = req;
      if (!page) {
        page = 1;
      }
      if (!limit) {
        limit = 10;
      }
      const skip = (page - 1) * 10;
      const playList = await this.playlistModel
        .find()
        .sort({ [sort]: -1 })
        .skip(skip)
        .limit(limit);
      return { playList, page: page + 1, limit };
    } catch (error) {
      throw new HttpException(
        'Error to search advacend playlist',
        HttpStatus.NOT_FOUND,
      );
    }
  }

  async create(dto: CreatePlaylistDTO, id: string) {
    try {
      const user = await this.usersModel.findOne({ where: { id: id } });
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
      const user = await this.usersModel.findOne({ where: { id: id } });
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

  async update(id: string, dto: UpdatePlaylistDTO, req) {
    try {
      const playlist = await this.playlistModel
        .findById({ _id: id })
        .select('userId');
      if (!playlist)
        throw new HttpException(
          `Erro to find a playlist with this id: ${id}`,
          HttpStatus.NOT_FOUND,
        );
      const user = await this.usersModel.findOne({ where: { id: id } });
      await this.playlistModel.findByIdAndUpdate(user._id, { dto });
      return { message: 'Playlist updated successfuly.' };
    } catch (error) {
      throw new HttpException(
        'Error to update a playlist ',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async remove(id: string, req) {
    try {
      const playlist = await this.playlistModel.findOne({ where: { id: id } });
      if (!playlist)
        throw new HttpException(
          `Erro to find a playlist with this id: ${id}`,
          HttpStatus.NOT_FOUND,
        );
      const user = await this.usersModel.findOne({ where: { id: id } });
      const index = user.playlist.indexOf(req.params.id);
      user.playlist.splice(index, 1);

      await user.save();
      await playlist.remove();
      return { message: 'Playlist deleted succesfully.' };
    } catch (error) {
      throw new HttpException(
        'Error to remove a playlist: ',
        HttpStatus.INTERNAL_SERVER_ERROR,
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
