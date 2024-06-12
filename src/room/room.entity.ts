import { Types } from "mongoose";
import { Message } from "src/messager/messager.entity";
import { User } from "src/user/user.entity";

export class Room {
    roomID: Types.ObjectId;
    title: string;
    messages: Message[];
    owner: User[];
    members: User[];
    imgMess: string;
}
