import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { Document, Types } from "mongoose";
import { Message } from "src/messager/messager.entity";
import { Room } from "src/room/room.entity";
export type UserDocument = Users & Document;

@Schema()
export class Users {
    @Prop({ type: mongoose.Schema.Types.ObjectId })
    _idUser: Types.ObjectId;

    @Prop()
    email: string;

    @Prop()
    name: string;

    @Prop()
    phonenumber: string;

    @Prop()
    listChat: Message[] | null;

    @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Room' }] })
    room: Room[];

    @Prop()
    birthDate: string;

    @Prop()
    avatar: string;
    
    @Prop()
    active: boolean;
}

export const UserSchema = SchemaFactory.createForClass(Users);