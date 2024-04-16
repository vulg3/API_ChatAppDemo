import { Types } from "mongoose";

export class Message {
    messID: Types.ObjectId;
    content: string;
    senderName: string; 
    sentTime: Date;
    isSeen: boolean;
}
