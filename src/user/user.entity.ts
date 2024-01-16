import { Types } from "mongoose";
import { Message } from "./user.schema";

export class Users {
    _id: Types.ObjectId;
    _idUser: Types.ObjectId;
    name: string;
    email: string;
    password: string;
    phone: string;
    active: boolean;
    avatar: string;
    gender: string;
    birthDay: string;
    isOnline: number;
    chat: Message[];

}
