import { Room } from "src/room/room.entity";
import { User } from "src/user/user.entity";

export class Message {
    messid: string;
    content: string;
    room: Room[];
    owner: User;
    time: Date;
}
