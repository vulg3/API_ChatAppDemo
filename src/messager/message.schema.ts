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
  name: string;

  @Prop({ default: Date.now }) 
  time: Date;

  @Prop() 
  isSeen: boolean;

}

export const MessageSchema = SchemaFactory.createForClass(Message);
