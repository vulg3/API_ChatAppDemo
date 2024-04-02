import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { Room } from '../room/room.schema'; 
import { User } from 'src/user/user.entity';
export type MessageDocument = Message & Document;

@Schema()
export class Message extends Document {
  @Prop()
  messid: string;

  @Prop()
  content: string;

  @Prop({ type: [{ type: { type: mongoose.Schema.Types.ObjectId, ref: 'Room' } }] })
  room: Room[];

  @Prop({ type: { type: mongoose.Schema.Types.ObjectId, ref: 'User' } })
  owner: User;

  @Prop()
  time: Date;
}

export const MessageSchema = SchemaFactory.createForClass(Message);
