import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Message, MessageDocument } from './message.schema';
import { CreateMessageDto } from './dto/create-message.dto';
import { GetMessagesDto } from './dto/get-message.dto';

@Injectable()
export class MessagerService {
  clientToUser: { id: string, avatar: string, name: string }[] = [];
  constructor(
    @InjectModel(Message.name)
    private readonly messageModel: Model<MessageDocument>,
  ) { }

  async createMessage(createMessageDto: CreateMessageDto) {
    const createdMessage = new this.messageModel(createMessageDto);
    return createdMessage.save();
  }


  
  async identify(name: string, _idUser: string, avatar: string) {
    const user = this.clientToUser.find((user: any) => user._idUser == _idUser)
    if (!user) {
      this.clientToUser.push({ id: _idUser, avatar: avatar, name: name });
      return _idUser;
    }
    return user.id;
  }

  getClientName(_idUser: string) {
    const user = this.clientToUser.find((user: any) => user.id == _idUser)
    return user.name;
  }

}
