import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Message, MessageDocument } from './message.schema';
import { CreateMessageDto } from './dto/create-message.dto';
import { GetMessagesDto } from './dto/get-message.dto';
import * as moment from 'moment';


@Injectable()
export class MessagerService {
  constructor(
    @InjectModel(Message.name)
    private readonly messageModel: Model<MessageDocument>,
  ) { }

  async createMessage(createMessageDto: CreateMessageDto) {
    const message = new this.messageModel({...createMessageDto , time: moment().format('YYY-MM-DD HH:mm:ss'),}); 
    await message.save(); 
    return message;
  }

  async findMessagesByRoomId(roomID: string): Promise<Message[]> {
    return this.messageModel.find({ 'room.id': roomID }).exec();
  }

  async readMessage(messID: string) {
    return this.messageModel.findById(messID).exec();
  }

  async deleteMessage(messID: string) {
    return this.messageModel.findByIdAndDelete(messID).exec();
  }

}
