import { CreateRoomResponseDTO } from './dto/create-room.dto';
import { UpdateRoomDto } from './dto/update-room.dto';
import { RoomResponseDTO } from './dto/getall-room.dto';

export interface IRoomService {
  getAllRoomsByIDUser(_idUser: string): Promise<RoomResponseDTO[]>;
  getMessByRoomID(roomID: string): Promise<RoomResponseDTO[]>;
  createRoom(createRoomDto: CreateRoomResponseDTO, _idUser: string): Promise<any>;
  createRoomPrivate(createRoomDto: CreateRoomResponseDTO, _idUser1: string, _idUser2: string): Promise<any>;
  updateRoom(roomID: string, updateRoomDto: UpdateRoomDto, _idUser: string): Promise<any>;
  deleteRoom(roomID: string, _idUser: string): Promise<any>;
  addMemberToRoom(roomID: string, membersToAdd: string[]): Promise<any>;
  deleteMemberToRoom(roomID: string, _idUser: string): Promise<any>;
}
