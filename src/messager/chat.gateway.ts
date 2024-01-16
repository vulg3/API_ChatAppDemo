import { MessageBody, SubscribeMessage, WebSocketGateway, WebSocketServer } from "@nestjs/websockets"
import { Server } from "socket.io";

@WebSocketGateway()
export class ChatGateway {
    
    @WebSocketServer()
    server: Server;


    @SubscribeMessage('Createmessage')
    handleMessage(@MessageBody() message: string): void {
        this.server.emit('Createmessage', message);
    }

}