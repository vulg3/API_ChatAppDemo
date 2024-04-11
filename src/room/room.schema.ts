import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document, Types } from 'mongoose';
import { Message } from 'src/messager/messager.entity';
import { User } from 'src/user/user.entity';
export type RoomDocument = Room & Document;

@Schema()
export class Room extends Document {
  @Prop({ type: mongoose.Schema.Types.ObjectId })
  roomID: Types.ObjectId;

  @Prop()
  title: string;

  @Prop({ type: [{ type: { type: mongoose.Schema.Types.ObjectId, ref: 'Message' } }] })
  messages: Message[];

  @Prop()
  owner: string;

  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }] })
  members: User[];
}

export const RoomSchema = SchemaFactory.createForClass(Room);
