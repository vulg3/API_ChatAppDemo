import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Message, MessageDocument } from './message.schema';
import { CreateMessageDto } from './dto/create-message.dto';
import { GetMessagesDto } from './dto/get-message.dto';
import * as moment from 'moment';
import { IMessagerService } from './messager';


@Injectable()
export class MessagerService implements IMessagerService {
  constructor(
    @InjectModel(Message.name)
    private readonly messageModel: Model<MessageDocument>,
  ) { }

  async createMessage(createMessageDto: CreateMessageDto) {
    const message = new this.messageModel({...createMessageDto , time: moment().format('YYY-MM-DD HH:mm:ss'),}); 
    await message.save(); 
    return message;
  }

  async readMessage(messID: string) {
    return this.messageModel.findById(messID).exec();
  }

  async deleteMessage(messID: string): Promise<any> {
    try {
        const result = await this.messageModel.findByIdAndDelete(messID).exec();
        if (!result) {
            // Trường hợp không tìm thấy dữ liệu để xóa
            return 'No message found to delete';
        }
        // Trường hợp xóa dữ liệu thành công, không có dữ liệu trả về
        return 'Message deleted successfully';
    } catch (error) {
        // Xử lý lỗi nếu có
        console.error('Error deleting message:', error);
        throw error; // Hoặc trả về một thông báo lỗi nếu cần
    }
}



}
