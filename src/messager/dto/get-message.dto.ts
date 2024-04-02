import { Message } from "../messager.entity";

export class GetMessagesDto extends Message {
    roomID: string;
}
