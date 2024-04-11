import { WebSocketGateway, SubscribeMessage, MessageBody, WebSocketServer, ConnectedSocket, OnGatewayConnection, OnGatewayDisconnect } from '@nestjs/websockets';
import { CreateMessageDto } from '../messager/dto/create-message.dto';
import { Server, Socket } from 'socket.io';
import { MessagerService } from '../messager/messager.service';
import { RoomService } from 'src/room/room.service';

@WebSocketGateway({
  cors: {
    origin: '*'
  }
})
export class ChatGateway {
  @WebSocketServer()
  server: Server;
  constructor(
    private readonly messagesService: MessagerService,

  ) {}

  @SubscribeMessage('message')
  async handleMessage(@MessageBody() createMessageDto: CreateMessageDto){
    const message = await this.messagesService.createMessage(createMessageDto);
    this.server.emit('message' , message);
  }

  @SubscribeMessage('typing')
  async typing(@MessageBody('isTyping') isTyping: boolean, @MessageBody('keyClient') keyClient: string, @MessageBody('roomIDTyping') roomIDTyping: string) {
    const name = await this.messagesService.getClientName(keyClient);
    this.server.emit('typing', { name, isTyping, roomIDTyping });
  }


  @SubscribeMessage('joinChat')
  async join(@MessageBody('name') name: string, @MessageBody('messid') messid: string, @MessageBody('avatar') avatar: string) {
    const clientObject = await this.messagesService.identify(name, messid, avatar);
    return clientObject;
  }
}
