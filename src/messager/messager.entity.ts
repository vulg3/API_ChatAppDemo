import { Room } from "src/room/room.schema";

export class Message {
    messID: string;
    content: string;
    name: string;
    time: Date;
    isSeen: boolean;
}
