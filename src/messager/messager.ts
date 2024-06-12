import { Message } from './message.schema';
import { CreateMessageDto } from './dto/create-message.dto';

export interface IMessagerService {
  createMessage(createMessageDto: CreateMessageDto): Promise<Message>;
  readMessage(messID: string): Promise<Message | null>;
  deleteMessage(messID: string): Promise<Message>;
}
