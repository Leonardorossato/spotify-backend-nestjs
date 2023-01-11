import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';

export type PlaylistDocument = Playlist & Document;

const ObjectId = mongoose.Types.ObjectId;

@Schema()
export class Playlist {
  @Prop({ required: false, type: String, minlength: 3 })
  name: string;

  @Prop({ required: false, type: ObjectId, ref: 'users' })
  userId?: string;

  @Prop({ required: false, type: String, minlength: 3 })
  description: string;

  @Prop({ required: true, type: String, default: [] })
  songs: string[];

  @Prop({ required: false, type: String })
  img: string;
}

export const PlaylistSchema = SchemaFactory.createForClass(Playlist);
