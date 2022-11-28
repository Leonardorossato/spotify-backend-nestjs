import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Users } from '../users/entities/users.entity';
import { Repository } from 'typeorm';
import { CreatePlaylistDTO } from './dto/create.playlist.dto';
import { Playlist } from './entities/playlist.entity';

@Injectable()
export class PlaylistService {
    constructor(
        @InjectRepository(Playlist) private readonly playlistRepository : Repository<Playlist>,
        @InjectRepository(Users) private readonly usersRepository : Repository<Users>
    ) {}

    async all(): Promise<Playlist[]>{
        try {
            const playlist = await this.playlistRepository.find()
            return playlist
        } catch (error) {
            throw new HttpException('Playlist not found', HttpStatus.NOT_FOUND)
        }
    }

    async create(dto: CreatePlaylistDTO, req){
        try {
            const user = await this.usersRepository.findOneBy({email: dto.userId.email})
            const playlist = await this.playlistRepository.save({
                ...dto,
                userId: req.user.id
            })
            return playlist
        } catch (error) {
            throw new HttpException('Can not create this playlist', HttpStatus.BAD_REQUEST)
        }
    }
}
