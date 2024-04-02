import { Module } from '@nestjs/common';
import { Room } from './room.entity';
import { RoomController } from './room.controller';
import { RoomService } from './room.service';
import { MongooseModule } from '@nestjs/mongoose';
import { RoomSchema } from './room.schema';

@Module({
    imports: [
        MongooseModule.forFeature([
            { name: Room.name, schema: RoomSchema },
        ]),
    ],
    controllers: [RoomController],
    providers: [RoomService]
})

export class RoomModule {}
