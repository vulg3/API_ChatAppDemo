import { Message } from "../messager.entity";

export class CreateMessageDto extends Message {
    roomID: string;
}
