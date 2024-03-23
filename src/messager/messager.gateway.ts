import { MessageBody, SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { MessagerService } from './messager.service';
import { CreateMessageDto } from './dto/create-message.dto';

@WebSocketGateway({cors: {origin: '*'}})
export class MessagerGateway {
  @WebSocketServer()
  server;
  constructor(private readonly messagesService: MessagerService) { }

  @SubscribeMessage('createMessage')
  async create(@MessageBody() createMessageDto: CreateMessageDto) {
    const messages = await this.messagesService.create(createMessageDto);
    this.server.emit('messages', messages);
    return;
  }


  
}
