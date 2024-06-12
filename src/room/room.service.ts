import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { CreateRoomResponseDTO } from './dto/create-room.dto';
import { UpdateRoomDto } from './dto/update-room.dto';
import { Room, RoomDocument } from './room.schema';
import { RoomResponseDTO } from './dto/getall-room.dto';
import { IRoomService } from './room';

@Injectable()
export class RoomService implements IRoomService {
    constructor(
        @InjectModel(Room.name)
        private readonly roomModel: Model<RoomDocument>,
    ) { }

    async getAllRoomsByIDUser(_idUser: string): Promise<RoomResponseDTO[]> {
        const page: number = 1;
        const limit: number = 10;
        try {
            const listRooms: RoomDocument[] = await this.roomModel.find({
                members: _idUser
            })
                .limit(limit)
                .skip((page - 1) * limit);
            const roomDTOs: RoomResponseDTO[] = listRooms.map(room => ({
                roomID: new Types.ObjectId(room.roomID),
                title: room.title,
                owner: room.owner,
                members: room.members,
                messages: room.messages,
                imgMess: room.imgMess
            }));
            return roomDTOs;
        } catch (error) {
            return error;
        }
    }

    async getMessByRoomID(roomID: string): Promise<RoomResponseDTO[]> {
        try {
            const room = await this.roomModel.findOne({ roomID });
            const roomResponse: RoomResponseDTO[] = room.messages.map(message => ({
                roomID: new Types.ObjectId(room.roomID),
                title: room.title,
                owner: room.owner,
                members: room.members,
                messages: [message], 
                imgMess: room.imgMess
            }));
            return roomResponse;
        } catch (error) {
            return error;
        }
    }


    async createRoom(createRoomDto: CreateRoomResponseDTO, _idUser) {
        try {
            const { roomID, title, members, messages } = createRoomDto;
            const membersWithOwner = [...members, _idUser];
            const owner = _idUser;
            const imgMess = 'https://img.freepik.com/free-photo/abstract-surface-textures-white-concrete-stone-wall_74190-8189.jpg';

            const createdRoom = new this.roomModel({
                roomID,
                title,
                owner,
                members: membersWithOwner,
                messages,
                imgMess
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

    async createRoomPrivate(createRoomDto: CreateRoomResponseDTO, _idUser1: string, _idUser2: string) {
        try {
            const { roomID, title, messages, imgMess } = createRoomDto;

            const createdRoom = new this.roomModel({
                roomID,
                title,
                owner: [_idUser1, _idUser2],
                messages,
                imgMess
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

    async addMemberToRoom(roomID: string, membersToAdd: string[]) {
        try {
            const room = await this.roomModel.findById(roomID);
            
            if (!room) {
                return {
                    status: false,
                    message: 'Room do not exist',
                }
            }

            const addMemberToRoom = await this.roomModel.findByIdAndUpdate(
                roomID,
                { $addToSet: { members: { $each: membersToAdd } } },
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
            const room = await this.roomModel.findById(roomID);

            if (!room) {
                return {
                    status: false,
                    message: 'Room do not exist',
                }
            }

            if (_idUser === room.owner.toString()) {
                return {
                    status: false,
                    message: 'You cannot remove owner to the room',
                }
            }

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
