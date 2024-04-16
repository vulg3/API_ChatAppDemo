import { Controller, Get, Post, Body, Patch, Param, Delete, Res, HttpStatus } from '@nestjs/common';
import { UserService } from './user.service';
import { Response } from 'express';
import { UserGetAllResponseDTO } from './dto/getall-user.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) { }

  //Url: http://localhost:3000/user/RegisterUser
  @Get('getAllUsers')
  async GetAllUsers(@Res() res: Response) {
    try {
      const responseDTO = await this.userService.GetAllUsers();
      return res.status(HttpStatus.OK).json(responseDTO);
    } catch (error) {
      return res.status(HttpStatus.BAD_REQUEST).json(error);
    }
  }

  //Url: http://localhost:3000/user/GetUserByID/:id
  @Post('GetUserByID/:id')
  async GetUserByID(@Param('id') _id: UserGetAllResponseDTO, @Body() body: { name: string, email: string }, @Res() res: Response) {
    try {
      const user = await this.userService.GetUserByID({ _id, body });
      return res.status(HttpStatus.OK).json(user);
    } catch (error) {
      return res.status(HttpStatus.BAD_REQUEST).json(error);
    }
  }

  @Post('updateUser')
  async updateUser(@Body() body: UserGetAllResponseDTO, @Res() res: Response) {
    try {
      const user = await this.userService.UpdateUser(body);
      return res.status(HttpStatus.OK).json(user);
    } catch (error) {
      return res.status(HttpStatus.BAD_REQUEST).json
    }
  }


}
