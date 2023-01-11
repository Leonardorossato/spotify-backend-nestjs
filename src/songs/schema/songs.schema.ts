import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type SongsDocument = Songs & Document;

@Schema()
export class Songs {
  @Prop({ required: false, type: String, minlength: 3 })
  name: string;

  @Prop({ required: false, type: String, minlength: 3, unique: true })
  artist: string;

  @Prop({ required: false, type: String, minlength: 3 })
  img: string;

  @Prop({ required: false, type: String, minlength: 4 })
  duration: string;
}

export const SongSchema = SchemaFactory.createForClass(Songs);
