import { PartialType } from '@nestjs/swagger';
import { CreatePlaylistDTO } from './create.playlist.dto';

export class UpdatePlaylistDTO extends PartialType(CreatePlaylistDTO) {}
