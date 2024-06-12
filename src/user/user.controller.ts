import { Controller, Get, Post, Body, Patch, Param, Delete, Res, HttpStatus, Inject } from '@nestjs/common';
import { Response } from 'express';
import { UserGetAllResponseDTO } from './dto/getall-user.dto';
import { IUserService } from './user';
import { Services } from 'src/utils/constants';

@Controller('user')
export class UserController {
  constructor(
    @Inject(Services.USERSERVICE)
    private readonly userService: IUserService,
  ) { }

  //Url: http://localhost:3000/user/GetAllUser
  @Get('GetAllUser')
  async getAllUser(@Res() res: Response) {
    try {
      const names = await this.userService.GetAllUsers();
      return res.status(HttpStatus.OK).json(names);
    } catch (error) {
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json(error);
    }
  }

  //Url: http://localhost:3000/user/GetUserByName/:name
  @Get('GetUserByName/:name')
  async getUserByName(@Param('name') name: string, @Res() res: Response) {
    try {
      const names = await this.userService.findUserByName(name);
      return res.status(HttpStatus.OK).json(names);
    } catch (error) {
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json(error);
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

  //Url: http://localhost:3000/user/updateUser
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
