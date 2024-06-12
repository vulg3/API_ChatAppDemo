import { Module } from '@nestjs/common';
import { Room } from './room.entity';
import { RoomController } from './room.controller';
import { RoomService } from './room.service';
import { MongooseModule } from '@nestjs/mongoose';
import { RoomSchema } from './room.schema';
import { Services } from 'src/utils/constants';

@Module({
    imports: [
        MongooseModule.forFeature([
            { name: Room.name, schema: RoomSchema },
        ]),
    ],
    controllers: [RoomController],
    providers: [
        {
            provide: Services.ROOMSERVICES,
            useClass: RoomService,
        },
    ],
    exports: [
        {
            provide: Services.ROOMSERVICES,
            useClass: RoomService,
        },
    ],
})

export class RoomModule {}

