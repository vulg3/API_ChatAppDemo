import { WebSocketGateway, SubscribeMessage, MessageBody, WebSocketServer, OnGatewayConnection, OnGatewayDisconnect } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { CreateMessageDto } from 'src/messager/dto/create-message.dto';
import { AuthService } from 'src/auth/auth.service';
import { JwtPayload } from 'src/auth/interfaces/jwt-payload.interface';
import { IMessagerService } from 'src/messager/messager';
import { Inject } from '@nestjs/common';
import { Services } from 'src/utils/constants';
import { IRoomService } from 'src/room/room';

@WebSocketGateway({
  cors: {
    origin: '*'
  }
})
export class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect {

  constructor(
    @Inject(Services.MESSAGESSERVICES)
    private readonly messagesService: IMessagerService,
    @Inject(Services.ROOMSERVICES)
    private readonly roomService: IRoomService,
    private readonly authService: AuthService,

  ) { }
  @WebSocketServer()
  server: Server;
  userService: any;
  handleConnection(client: Socket) {
    const token = client.handshake.auth.token;
    try {
      const payload: JwtPayload = this.authService.verifyToken(token);
      if (!payload) {
        client.disconnect(true);
        console.log(`Client ${client.id} disconnected`);
      } else {
        console.log(`Client ${client.id} connected. Auth token: ${token}`);
      }
    } catch (error) {
      console.error('Error verifying token:', error.message);
      client.disconnect(true);
      console.log(`Client ${client.id} disconnected due to error in token verification`);
    }
  }

  handleDisconnect(client: Socket) {
    console.log(`Client ${client.id} disconnected`);
  }

  @SubscribeMessage('leave')
  handleLeave(client: Socket, roomId: number) {
    console.log(`Client ${client.id} leaved room: ${roomId}`);
    client.leave(roomId.toString());
    return roomId;
  }

  @SubscribeMessage('getAllRoomsByIDUser')
  async handleFindALlRoomByIDuser(client: Socket, _idUser: string) {
    const room = await this.roomService.getAllRoomsByIDUser(_idUser);
    client.emit('getAllRoomsByIDUser', room);
  }

  @SubscribeMessage('getMessByRoomID')
  async handleFindMessageByRoomID(client: Socket, roomID: string) {
    const roommessage = await this.roomService.getMessByRoomID(roomID);
    client.emit('getMessByRoomID', roommessage);
  }

  @SubscribeMessage('addMemberToRoom')
  async handleAddMember(client: Socket, payload: { roomID: string, membersToAdd: { members: string[] } }) {
    const { roomID, membersToAdd } = payload;
    try {
      const result = await this.roomService.addMemberToRoom(roomID, membersToAdd.members);
      client.emit('addMemberToRoom', result);
    } catch (error) {
      console.error(error);
      client.emit('error', { message: 'Failed to add member to room' });
    }
  }

  @SubscribeMessage('deleteMemberToRoom')
  async handleDeleteMember(client: Socket, payload: { roomID: string, _idUser: string }) {
    const { roomID, _idUser } = payload;
    try {
      const result = await this.roomService.deleteMemberToRoom(roomID, _idUser);
      client.emit('deleteMemberToRoom', result);
    } catch (error) {
      console.error(error);
      client.emit('error', { message: 'Failed to delete member to room' });
    }
  }

  @SubscribeMessage('message')
  async handleMessage(@MessageBody() createMessageDto: CreateMessageDto) {
    const message = await this.messagesService.createMessage(createMessageDto);
    this.server.emit('message', message);
    return;
  }

  @SubscribeMessage('isTyping')
  async handleTypingNotification(client: Socket, roomId: CreateMessageDto) {
    client.to(roomId.toString()).emit('isTyping', `${client.id} typing message...`);
  }

}
