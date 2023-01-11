import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { PlaylistModule } from './playlist/playlist.module';
import { SongsModule } from './songs/songs.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { mongoAsyncConnection } from './config/mongo.config';
@Module({
  imports: [
    MongooseModule.forRootAsync(mongoAsyncConnection),
    ConfigModule.forRoot({ isGlobal: true }),
    UsersModule,
    PlaylistModule,
    SongsModule,
    AuthModule,
  ],
})
export class AppModule {}
