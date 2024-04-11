import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateRoomResponseDTO } from './dto/create-room.dto';
import { UpdateRoomDto } from './dto/update-room.dto';
import { Room, RoomDocument } from './room.schema';
import { RoomRequestDTO } from './dto/getall-room.dto';
@Injectable()
export class RoomService {
    constructor(
        @InjectModel(Room.name)
        private readonly roomModel: Model<RoomDocument>,
    ) { }

    async getAllRoomsByIDUser(_idUser: string): Promise<RoomRequestDTO[]> {
        try {
            const listRooms: RoomDocument[] = await this.roomModel.find({
                $or: [
                    { owner: _idUser },
                    { members: _idUser }
                ]
            });
            const roomDTOs: RoomRequestDTO[] = listRooms.map(room => ({
                roomID: room.roomID,
                title: room.title,
                owner: room.owner,
                members: room.members,
                messages: room.messages,
            }));
            return roomDTOs;
        } catch (error) {
            return error;
        }
    }

    async createRoom(createRoomDto: CreateRoomResponseDTO, _idUser) {
        try {
            const { title, members, messages } = createRoomDto;
            const membersWithOwner = [...members, _idUser];
            const owner = _idUser;

            const createdRoom = new this.roomModel({
                title,
                owner,
                members: membersWithOwner,
                messages
            });

            await createdRoom.save();
            return createdRoom;
        } catch (error) {
            return {
                status: false,
                message: 'Failed' + error,
            };
        }
    }

    async updateRoom(roomID: string, updateRoomDto: UpdateRoomDto, _idUser: string) {
        const updatedRoom = await this.roomModel.findByIdAndUpdate(
            roomID,
            { ...updateRoomDto, owner: _idUser },
            { new: true },
        );
        if (!updatedRoom) {
            throw new NotFoundException(`Room not found`);
        }
        return updatedRoom;
    }

    async deleteRoom(roomID: string, _idUser: string) {
        const deletedRoom = await this.roomModel.findOneAndDelete({
            _id: roomID,
            owner: _idUser,
        });
        if (!deletedRoom) {
            throw new NotFoundException(`Room not found`);
        }
        return deletedRoom;
    }

    async addMemberToRoom(roomID: string, _idUser: string) {
        try {
            const addMemberToRoom = await this.roomModel.findByIdAndUpdate(
                roomID,
                { $addToSet: { members: _idUser } },
                { new: true },
            );
            if (!addMemberToRoom) {
                throw new NotFoundException(`Room not found`);
            }
            await addMemberToRoom.save();
            return {
                status: true,
                message: 'Add MemberToRoom successfully',
            }
        } catch (error) {
            return {
                status: false,
                message: 'Failed' + error,
            };
        }
    }

    async deleteMemberToRoom(roomID: string, _idUser: string) {
        try {
            const deleteMemberToRoom = await this.roomModel.findByIdAndUpdate(
                roomID,
                { $pull: { members: _idUser } },
                { new: true },
            );
            if (!deleteMemberToRoom) {
                throw new NotFoundException(`Room not found`);
            }
            await deleteMemberToRoom.save();
            return {
                status: true,
                message: 'Delete member successfully',
            }
        } catch (error) {
            return {
                status: false,
                message: 'failed' + error,
            }
        }
    }
}
