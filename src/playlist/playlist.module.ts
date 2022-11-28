import { Module } from '@nestjs/common';
import { PlaylistService } from './playlist.service';
import { PlaylistController } from './playlist.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Playlist } from './entities/playlist.entity';
import { UsersModule } from '../users/users.module';
import { UsersService } from '../users/users.service';
import { Users } from 'src/users/entities/users.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Playlist]), UsersModule],
  controllers: [PlaylistController],
  providers: [PlaylistService]
})
export class PlaylistModule {}
