import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { PlaylistModule } from './playlist/playlist.module';
import { SongsModule } from './songs/songs.module';
import { AuthModule } from './auth/auth.module';
@Module({
  imports: [UsersModule, PlaylistModule, SongsModule, AuthModule]
})
export class AppModule {}
