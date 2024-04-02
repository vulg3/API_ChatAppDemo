import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateRoomDto } from './dto/create-room.dto';
import { UpdateRoomDto } from './dto/update-room.dto';
import { Room, RoomDocument } from './room.schema';

@Injectable()
export class RoomService {
    constructor(
        @InjectModel(Room.name)
        private readonly roomModel: Model<RoomDocument>,
    ) { }

    async getAllRooms() {
        return this.roomModel.find().exec();
    }

    async getRoomByRoomID(roomID: string) {
        return this.roomModel.findOne({ roomID }).exec();
    }

    async createRoom(createRoomDto: CreateRoomDto, _idUser: string) {
        const createdRoom = new this.roomModel({
            title: createRoomDto.title,
            owner: _idUser,
        });
        return createdRoom.save();
    }

    async updateRoom(id: string, updateRoomDto: UpdateRoomDto, _idUser: string) {
        const updatedRoom = await this.roomModel.findByIdAndUpdate(
            id,
            { ...updateRoomDto, owner: _idUser },
            { new: true },
        );
        if (!updatedRoom) {
            throw new NotFoundException(`Room with id ${id} not found`);
        }
        return updatedRoom;
    }

    async deleteRoom(id: string, userID: string) {
        const deletedRoom = await this.roomModel.findOneAndDelete({
            _id: id,
            owner: userID,
        });
        if (!deletedRoom) {
            throw new NotFoundException(`Room with id ${id} not found`);
        }
        return deletedRoom;
    }
}
