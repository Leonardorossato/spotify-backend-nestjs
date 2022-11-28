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
            const user = await this.usersRepository.findOneBy({id: dto.userId})
            if(!user){
                throw new HttpException('User with this id not found', HttpStatus.NOT_FOUND)
            }
            const playlist = await this.playlistRepository.save({
                ...dto,
                songs: dto[0].songs,
                userId: dto.userId
            })
            return playlist
        } catch (error) {
            throw new HttpException('Can not create this playlist', HttpStatus.BAD_REQUEST)
        }
    }
    
    async addSong(dto: CreatePlaylistDTO, id: number, req){
        const user = await this.usersRepository.findOneBy({id: dto.userId})
        const playlist = await this.playlistRepository.findOneBy({id: id})
        if(!user.id && !playlist.id){
            throw new HttpException('User dont create to add song to this playlist', HttpStatus.BAD_REQUEST)
        }
        if(playlist.songs.indexOf(req.body.songsId) === -1){
            playlist.songs.push(req.body.songsId)
        }
    }
}
