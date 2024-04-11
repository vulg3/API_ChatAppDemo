import { Controller, Get, HttpCode, HttpStatus, Param, Res, Put, Delete, Body, Post } from '@nestjs/common';
import { RoomService } from './room.service';
import { Response, response } from 'express';
import { UpdateRoomDto } from './dto/update-room.dto';
import { CreateRoomResponseDTO } from './dto/create-room.dto';
import { Types } from 'mongoose';


@Controller('room')
export class RoomController {
    constructor(private readonly roomService: RoomService) { }


    //http://localhost:3000/room/getAllRoomsByIDUser/:_idUser
    @Get('getAllRoomsByIDUser/:_idUser')
    async getAllRoomsByIDUser(@Param('_idUser') _idUser: string, @Res() res: Response) {
        try {
            const responseDTO = await this.roomService.getAllRoomsByIDUser(_idUser);
            return res.status(HttpStatus.OK).json(responseDTO);
        } catch (error) {
            return res.status(HttpStatus.BAD_REQUEST).json(error);
        }
    }

    @Post('createRoomByIDUser/:_idUser')
    async createRoomByIDUser(@Param('_idUser') _idUser: string, @Body() body: CreateRoomResponseDTO, @Res() res: Response) {
        try {
            const responseDTO = await this.roomService.createRoom(body, _idUser);
            return res.status(HttpStatus.OK).json(responseDTO);

        } catch (error) {
            return res.status(HttpStatus.BAD_REQUEST).json(error);
        }
    }

    @Post('addMemberToRoom/:roomID/:_idUser')
    async addMemberToRoom(@Param('roomID') roomID: string, @Param('_idUser') _idUser: string, @Res() res: Response) {
        try {
            const result = await this.roomService.addMemberToRoom(roomID, _idUser);
            return res.status(HttpStatus.OK).json(result);
        } catch (error) {
            return res.status(HttpStatus.BAD_REQUEST).json(error);
        }
    }

    @Post('deleteMemberToRoom/:roomID/:_idUser')
    async deleteMemberToRoom(@Param('roomID') roomID: string, @Param('_idUser') _idUser: string, @Res() res: Response) {
        try {
            const result = await this.roomService.deleteMemberToRoom(roomID, _idUser);
            return res.status(HttpStatus.OK).json(result);
        } catch (error) {
            return res.status(HttpStatus.BAD_REQUEST).json(error);
        }
    }

    @Put('updateRoom/:roomID/:_idUser')
    async updateRoom(@Param('roomID') roomID: string, @Param('_idUser') _idUser: string, @Body() updateRoomDto: UpdateRoomDto, @Res() res: Response) {
        try {
            const updatedRoom = await this.roomService.updateRoom(roomID, updateRoomDto, '_idUser');
            return res.status(HttpStatus.OK).json(updatedRoom);
        } catch (error) {
            return res.status(HttpStatus.BAD_REQUEST).json(error);
        }
    }

    @Delete('deleteRoom/:roomID/:_idUser')
    async deleteRoom(@Param('roomID') roomID: string, @Param('_idUser') _idUser: string, @Res() res: Response) {
        try {
            const deletedRoom = await this.roomService.deleteRoom(roomID, _idUser);
            return res.status(HttpStatus.OK).json(deletedRoom);
        } catch (error) {
            return res.status(HttpStatus.BAD_REQUEST).json({ message: error.message });
        }
    }
    
}











