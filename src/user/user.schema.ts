
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { Document, ObjectId, SchemaTypes, Types } from "mongoose";
export type UserDocument = Users & Document;


export class Message{
    @Prop()
    Text : string;

    @Prop()
    Time: string;

    @Prop()
    type: string;

}

@Schema()
export class Users {

    @Prop({ type: mongoose.Schema.Types.ObjectId })
    _idUser: Types.ObjectId;

    @Prop()
    name: string;

    @Prop()
    email: string;

    @Prop({ required: true })
    password: string;

    @Prop()
    phone: string;

    @Prop()
    active: boolean;

    @Prop()
    avatar: string;

    @Prop()
    isOnline: number;
    
    @Prop()
    gender: string;

    @Prop()
    birthDay: string;

    @Prop()
    chat: Message[] | null;

}

export const UserSchema = SchemaFactory.createForClass(Users);