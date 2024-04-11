import { Module } from '@nestjs/common';
import { ChatGateway } from './chat.gateway';
import { AuthModule } from 'src/auth/auth.module';
import { MessagerModule } from 'src/messager/messager.module';

@Module({
    imports: [AuthModule, MessagerModule],
    providers: [ChatGateway],
})
export class ChatModule { }
