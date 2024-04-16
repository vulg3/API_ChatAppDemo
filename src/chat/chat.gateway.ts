import { WebSocketGateway, SubscribeMessage, MessageBody, WebSocketServer, OnGatewayConnection, OnGatewayDisconnect } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { MessagerService } from '../messager/messager.service';
import { CreateMessageDto } from 'src/messager/dto/create-message.dto';
import { AuthService } from 'src/auth/auth.service';
import { OnModuleInit } from '@nestjs/common';

@WebSocketGateway({
  cors: {
    origin: '*'
  }
})
export class ChatGateway implements OnModuleInit{
  @WebSocketServer()
  server: Server;
  constructor(
    private readonly messagesService: MessagerService,
  ) {}
  onModuleInit() {
    this.server.on('connection' , (socket) =>{
      console.log(socket.id);
      console.log('Connected');
    });
  }

  @SubscribeMessage('join')
  handleJoin(client: Socket, roomId: number) {
    console.log(`Client ${client.id} joined room: ${roomId}`);
    client.join(roomId.toString());
    return roomId;
  }

  @SubscribeMessage('leave')
  handleLeave(client: Socket, roomId: number) {
    console.log(`Client ${client.id} leaved room: ${roomId}`);
    client.leave(roomId.toString());
    return roomId;
  }

  @SubscribeMessage('message')
  async handleMessage(@MessageBody() createMessageDto: CreateMessageDto) {
      const message = await this.messagesService.createMessage(createMessageDto);
      this.server.emit('message', message);
      return;
  }

  @SubscribeMessage('isTyping')
  async handleTypingNotification(client: Socket, roomId: CreateMessageDto) {
    console.log(`Client ${client.id} typing message to room: ${roomId}`);
    client
      .to(roomId.toString())
      .emit('isTyping', `${client.id} typing message...`);
  }

  @SubscribeMessage('findMessagesByRoomID')
  async handleFindMessageByRoomID(client : Socket , roomID : string){
    const message = await this.messagesService.findMessagesByRoomId(roomID);
    client.emit('messagesByRoomID' , message);
  }
  
}
