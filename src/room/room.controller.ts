import { Controller, Get, HttpCode, HttpStatus, Param, Res, Put, Delete, Body } from '@nestjs/common';
import { RoomService } from './room.service';
import { Response, response } from 'express';
import { UpdateRoomDto } from './dto/update-room.dto';


@Controller('room')
export class RoomController {
    constructor (private readonly roomService: RoomService){}

    @Get('GetAllRoom')
    async getAllRoom(@Res() res : Response){
        try {
            const responseDTO = await this.roomService.getAllRooms();
            return res.status(HttpStatus.OK).json(responseDTO);
        } catch (error) {
            return res.status(HttpStatus.BAD_REQUEST).json(error);
            
        }
    }
    @Get('GetAllRoomByID/:roomID')
    async GetAllRoomByID(@Param('roomID') roomID: string,@Res() res : Response){
        try {
            const responseDTO = await this.roomService.getRoomByRoomID(roomID); // Sử dụng roomID để lấy thông tin về phòng từ service
            return res.status(HttpStatus.OK).json(responseDTO);
        } catch (error) {
            return res.status(HttpStatus.BAD_REQUEST).json(error);
        }
    }

    @Put(':id')
    async updateRoom(@Param('id') id: string, @Body() updateRoomDto: UpdateRoomDto, @Res() res: Response) {
        try {
            const updatedRoom = await this.roomService.updateRoom(id, updateRoomDto , '_idUser');
            return res.status(HttpStatus.OK).json(updatedRoom);
        } catch (error) {
            return res.status(HttpStatus.BAD_REQUEST).json(error);
        }
    }

    @Delete(':id')
    async deleteRoom(@Param('id') id: string, @Res() res: Response) {
        try {
            const deletedRoom = await this.roomService.deleteRoom(id , '_idUser');
            return res.status(HttpStatus.OK).json(deletedRoom);
        } catch (error) {
            return res.status(HttpStatus.BAD_REQUEST).json(error);
        }
    }
}











