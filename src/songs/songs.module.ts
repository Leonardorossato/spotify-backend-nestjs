import { Module } from '@nestjs/common';
import { SongsService } from './songs.service';
import { SongsController } from './songs.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Songs } from './entities/songs.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Songs])],
  controllers: [SongsController],
  providers: [SongsService]
})
export class SongsModule {}
