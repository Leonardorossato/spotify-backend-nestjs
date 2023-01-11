import { Module } from '@nestjs/common';
import { SongsService } from './songs.service';
import { SongsController } from './songs.controller';
import { Songs, SongSchema } from './schema/songs.schema';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Songs.name, schema: SongSchema }]),
  ],
  controllers: [SongsController],
  providers: [SongsService],
})
export class SongsModule {}
