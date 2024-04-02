import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { Message } from 'src/messager/messager.entity';
import { User } from 'src/user/user.entity';
export type RoomDocument = Room & Document;

@Schema()
export class Room extends Document {
  @Prop()
  roomID: string;

  @Prop()
  title: string;

  @Prop({ type: [{ type: { type: mongoose.Schema.Types.ObjectId, ref: 'Message' } }] })
  messages: Message[];

  @Prop({ type: { type: mongoose.Schema.Types.ObjectId, ref: 'User' } })
  owner: User;

  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }] })
  members: User[];
}

export const RoomSchema = SchemaFactory.createForClass(Room);
