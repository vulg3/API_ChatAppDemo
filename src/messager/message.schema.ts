import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document, Types } from 'mongoose';
export type MessageDocument = Message & Document;


@Schema()
export class Message extends Document {
  @Prop({ type: mongoose.Schema.Types.ObjectId })
  messID: Types.ObjectId;

  @Prop()
  content: string;

  @Prop() 
  senderName: string;

  @Prop({ default: Date.now }) 
  sendTime: Date;

  @Prop() 
  isSeen: boolean;

}

export const MessageSchema = SchemaFactory.createForClass(Message);
