import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { PlaylistModule } from './playlist/playlist.module';
import { SongsModule } from './songs/songs.module';
import { AuthModule } from './auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmAsyncConfig } from './config/ormconfig';
import { ConfigModule } from '@nestjs/config';
@Module({
  imports: [
    TypeOrmModule.forRootAsync(typeOrmAsyncConfig),
    ConfigModule.forRoot({ isGlobal: true }),
    UsersModule,
    PlaylistModule,
    SongsModule,
    AuthModule,
  ],
})
export class AppModule {}
