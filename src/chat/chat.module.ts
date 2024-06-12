import { Module } from '@nestjs/common';
import { ChatGateway } from './chat.gateway';
import { AuthModule } from 'src/auth/auth.module';
import { MessagerModule } from 'src/messager/messager.module';
import { RoomModule } from 'src/room/room.module';

@Module({
    imports: [AuthModule, MessagerModule , RoomModule],
    providers: [ChatGateway],
})
export class ChatModule { }
