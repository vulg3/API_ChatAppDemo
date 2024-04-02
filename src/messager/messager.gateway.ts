import { WebSocketGateway, SubscribeMessage, MessageBody, WebSocketServer, ConnectedSocket, OnGatewayConnection, OnGatewayDisconnect } from '@nestjs/websockets';
import { CreateMessageDto } from './dto/create-message.dto';
import { Server, Socket } from 'socket.io';
import { MessagerService } from './messager.service';
import { AuthService } from 'src/auth/auth.service';

@WebSocketGateway({
  cors: {
    origin: '*'
  }
})
export class MessagesGateway implements OnGatewayConnection, OnGatewayDisconnect {
  constructor(
    private readonly messagesService: MessagerService,
    private readonly authService: AuthService
    ) { }
  handleDisconnect(client: Socket) {
    console.log(`Client ${client.id} disconnected`);
  }

  handleConnection(client: Socket) {
    const token = client.handshake.auth.token;
    const payload = this.authService.verifyToken(token);

    if (!payload) {
      client.disconnect(true);
    } else {
      console.log(`Client ${client.id} connected. Auth token: ${token}`);
    }
  }

  @SubscribeMessage('joinChat')
  handleJoin(client: Socket , roomID: string){
    client.join(roomID.toString());
    return roomID;
  }

  @SubscribeMessage('outChat')
  handleOut(client: Socket , roomID: string){
    client.leave(roomID.toString());
    return roomID;
  }

  @SubscribeMessage('message')
  async handleMessage(client:Socket , CreateMessageDto : CreateMessageDto){
    const message = await this.messagesService.createMessage(CreateMessageDto);
    client.emit('message' , message);
    client.to(message.room.toString()).emit('message', message);
  }

  @SubscribeMessage('isTyping')
  async handleTyping(client : Socket , roomID : CreateMessageDto){
    client.to(roomID.toString()).emit('isTyping' , `${client.id} typing message ..`);
  }


}
