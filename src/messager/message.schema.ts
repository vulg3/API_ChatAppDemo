import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
export type MessageDocument = Message & Document;

@Schema()
export class Message extends Document {
  @Prop()
  messID: string;

  @Prop()
  content: string;

  @Prop()
  name: string;

  @Prop()
  time: Date;

  @Prop()
  isSeen: boolean;
}



export const MessageSchema = SchemaFactory.createForClass(Message);
