
import { Types } from "mongoose";
import { Message } from "src/messager/messager.entity";
import { Room } from "src/room/room.entity";

export class User {
    _id: Types.ObjectId;
    _idUser: Types.ObjectId;
    email: string;
    name: string;
    status:string;
    phonenumber: string;
    listChat: Message[];
    birthDate: string;
    avatar: string;
    room:Room[];
    active: boolean;
}
