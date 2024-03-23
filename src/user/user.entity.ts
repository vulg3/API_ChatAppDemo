import { Types } from "mongoose";
import { chat } from "./user.schema";

export class User {
    _id: Types.ObjectId;
    _idUser: Types.ObjectId;
    email: string;
    name: string;
    password: string;
    phonenumber: string;
    listChat: chat[];
    birthDate: string;
    avatar: string;
}
