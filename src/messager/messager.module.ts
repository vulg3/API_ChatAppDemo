import { Module } from '@nestjs/common';
import { MessagerService } from './messager.service';
import { Message } from './messager.entity';
import { MessageController } from './message.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { MessageSchema } from './message.schema';
import { UserModule } from 'src/user/user.module';
import { Services } from 'src/utils/constants';

@Module({
    imports: [
        MongooseModule.forFeature([
            { name: Message.name, schema: MessageSchema },
        ]),
        UserModule
    ],
    controllers: [MessageController],
    providers: [
        {
            provide: Services.MESSAGESSERVICES,
            useClass: MessagerService,
        },
    ],
    exports: [
        {
            provide: Services.MESSAGESSERVICES,
            useClass: MessagerService,
        },
    ],
})
export class MessagerModule { }
