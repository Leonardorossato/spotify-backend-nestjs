import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateSongDTO } from './dto/create.song.dto';
import { Songs } from './schema/songs.schema';

@Injectable()
export class SongsService {
  constructor(
    @InjectModel(Songs.name) private readonly songsModel: Model<Songs>,
  ) {}

  async all(): Promise<Songs[]> {
    try {
      const songs = await this.songsModel.find();
      return songs;
    } catch (error) {
      throw new HttpException('Songs not found', HttpStatus.NOT_FOUND);
    }
  }

  async create(dto: CreateSongDTO) {
    try {
      const song = await this.songsModel.create(dto);
      if (!song) {
        throw new HttpException(
          'Erro to create this song',
          HttpStatus.BAD_REQUEST,
        );
      }
      const newSong = await this.songsModel.create(song);
      await newSong.save();
      return newSong;
    } catch (error) {
      throw new HttpException('Erro', HttpStatus.BAD_GATEWAY);
    }
  }
}
