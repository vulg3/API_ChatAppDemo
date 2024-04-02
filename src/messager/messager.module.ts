import { Module } from '@nestjs/common';
import { MessagerService } from './messager.service';
import { Message } from './messager.entity';
import { MessageController } from './message.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { MessageSchema } from './message.schema';

@Module({
    imports: [
        MongooseModule.forFeature([
            { name: Message.name, schema: MessageSchema },
        ]),
    ],
    controllers: [MessageController],
    providers: [MessagerService],
    exports: [MessagerService],
})
export class MessagerModule { }
