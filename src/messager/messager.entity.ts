import { Types } from "mongoose";

export class Message {
    messID: Types.ObjectId;
    content: string;
    senderName: string; 
    sendTime: Date;
    isSeen: boolean;
}
