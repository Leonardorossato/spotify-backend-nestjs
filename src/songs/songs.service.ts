import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateSongDto } from './dto/create-song.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Song } from './entities/song.entity';
import { Repository } from 'typeorm';
@Injectable()
export class SongsService {
  constructor(
    @InjectRepository(Song) private readonly songRepository: Repository<Song>,
  ) {}

  async create(dto: CreateSongDto) {
    try {
      const song = await this.songRepository.create(dto);
      await this.songRepository.save(song);
      return song;
    } catch (error) {
      throw new HttpException('Error to create a song', HttpStatus.BAD_REQUEST);
    }
  }

  async findAll() {
    try {
      const song = await this.songRepository.find();
      return song;
    } catch (error) {
      throw new HttpException(
        'Error to find all songs: ',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
