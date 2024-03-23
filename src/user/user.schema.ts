import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { Document, Types } from "mongoose";
export type UserDocument = Users & Document;

export class chat{
    @Prop()
    text:string;
}
@Schema()
export class Users {
    @Prop({ type: mongoose.Schema.Types.ObjectId })
    _idUser: Types.ObjectId;
    
    @Prop()
    email: string;

    @Prop({ required: true })
    password: string;

    @Prop()
    name: string;

    @Prop()
    phonenumber: string;

    @Prop()
    listChat: chat[] | null;

    @Prop()
    birthDate: string;

    @Prop()
    avatar: string;
}

export const UserSchema = SchemaFactory.createForClass(Users);