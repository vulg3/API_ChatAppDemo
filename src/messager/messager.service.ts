import { Injectable } from '@nestjs/common';
import { Message } from './messager.entity';

@Injectable()
export class MessagerService {
    clientToUser = {};
    room: {
        roomID: string;
        nameRoom: string;
        messages: Message[]
    }[] = [];
    roomByUser: {
        roomID: string;
        userID: any;
        messages: Message[]
    }[] = [];
    create(createMessageDto: any) {
        const messages = {
            name: this.clientToUser[createMessageDto.clientID],
            text: createMessageDto.text
        };
        this.room.map((room: any) => {
            room.roomID == createMessageDto.roomID && room.messages.push(messages);
        });
        return messages;
    }


}
