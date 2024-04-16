import { Types } from "mongoose";
import { Message } from "src/messager/messager.entity";
import { User } from "src/user/user.entity";

export class Room {
    roomID: string;
    title: string;
    messages: Message[];
    owner:User[];
    members:User[];
}
