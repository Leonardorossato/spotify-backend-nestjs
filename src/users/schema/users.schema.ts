import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type UserDocument = Users & Document

@Schema()
export class Users {
  @Prop({ required: true, type: String, minlength: 3, maxlength: 255 })
  name: string;

  @Prop({
    required: false,
    type: String,
    minlength: 3,
    maxlength: 255,
    unique: true,
  })
  email: string;

  @Prop({ required: true, type: String, maxlength: 11 })
  cpf: string;

  @Prop({ required: true, type: String, minlength: 3, maxlength: 255 })
  password: string;

  @Prop({ required: false, type: String })
  likedSongs: string;

  @Prop({ required: false, type: String, default: [] })
  playlist: string[] = [];
}

export const UsersSchema = SchemaFactory.createForClass(Users)