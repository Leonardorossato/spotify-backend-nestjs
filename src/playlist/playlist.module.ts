import { Module } from '@nestjs/common';
import { PlaylistService } from './playlist.service';
import { PlaylistController } from './playlist.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Playlist } from './entities/playlist.entity';
import { Song } from '@/songs/entities/song.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Playlist, Song])],
  controllers: [PlaylistController],
  providers: [PlaylistService],
})
export class PlaylistModule {}
