import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateSongDTO } from './dto/create.song.dto';
import { Songs } from './entities/songs.entity';

@Injectable()
export class SongsService {
    constructor(@InjectRepository(Songs) private songsRepository: Repository<Songs>){}

    async all(): Promise<Songs[]>{
        try {
            const songs = await this.songsRepository.find()
            return songs
        } catch (error) {
            throw new HttpException('Songs not found', HttpStatus.NOT_FOUND)
        }
    }

    async create(dto: CreateSongDTO){
        try {
            const song = await this.songsRepository.create(dto)
            if(!song){
                throw new HttpException('Erro to create this song', HttpStatus.BAD_REQUEST)
            }
            const newSong = await this.songsRepository.save(song)
            return newSong
        } catch (error) {
            throw new HttpException('Erro', HttpStatus.BAD_GATEWAY)
        }
    }
}
