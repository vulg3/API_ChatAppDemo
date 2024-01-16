import { Controller, Get, Post, Body, Param, Res, HttpStatus } from '@nestjs/common';
import { UserService } from './user.service';
import { Response } from 'express';
import { UserUpdateInfoRequestDTO } from './dto/user_updateInfo_request';
import { UserGetByIDRequestDTO } from './dto/user_getByID_request';
import { UserLoginRequestDTO } from './dto/user_login_request';
import { UserSendMailRequestDTO } from './dto/user_sendmail_request';
import { UserForGotRequestDTO } from './dto/user_forgot_request';
import { UserInsertRequestDTO } from './dto/user_register_request';
//Url: http://localhost:3000/users
@Controller('users')
export class UserController {
    constructor(private readonly userService: UserService) { }

    //Url: http://localhost:3000/users/RegisterUser
    @Post('RegisterUser')
    async RegisterUser(@Body() body: UserInsertRequestDTO, @Res() res: any) {
        try {
            body = { ...body}
            const responseDTO = await this.userService.RegisterUser(body);
            return res.status(HttpStatus.OK).json(responseDTO);
        } catch (error: any) {
            return res.status(HttpStatus.BAD_REQUEST).json(error);
        }
    }

    //Url: http://localhost:3000/users/LoginUser
    @Post('LoginUser')
    async LoginUser(@Body() body: UserLoginRequestDTO, @Res() res: any) {
        try {
            const responseDTO = await this.userService.LoginUser(body);
            return res.status(HttpStatus.OK).json(responseDTO);
        } catch (error: any) {
            return res.status(HttpStatus.BAD_REQUEST).json(error);
        }

    }

    
    //Url: http://localhost:3000/users/ForgotPassword
    @Post('ForgotPassword')
    async ForGotPass(@Body() body: UserForGotRequestDTO, @Res() res: any) {
        try {
            const responseDTO = await this.userService.ForGotPass(body);
            return res.status(HttpStatus.OK).json(responseDTO);
        } catch (error: any) {
            return res.status(HttpStatus.BAD_REQUEST).json(error);
        }
    }
    
    @Post('VerifyEmail')
    async SendMail(@Body() body: UserSendMailRequestDTO, @Res() res: any) {
        try {
            const responseDTO = await this.userService.VerifyUser(body);
            return res.status(HttpStatus.OK).json(responseDTO);
        } catch (error: any) {
            return res.status(HttpStatus.BAD_REQUEST).json(error);
        }
    }

    @Post('ChangePassword')
    async ChangePassword(@Body() body: any, @Res() res: any) {
        try {
            const responseDTO = await this.userService.ChangePassword(body);
            return res.status(HttpStatus.OK).json(responseDTO);
        } catch (error: any) {
            return res.status(HttpStatus.BAD_REQUEST).json(error);
        }
    }

    @Get('getAllUsers')
    async getAllUsers(@Res() res: Response) {
        try {
            const responseDTO = await this.userService.GetAllUsers();
            return res.status(HttpStatus.OK).json(responseDTO);
        } catch (error) {
            return res.status(HttpStatus.BAD_REQUEST).json(error);
        }

    }

    @Post('getUser/:id')
    async getUserByID(@Param('id') _id: UserGetByIDRequestDTO, @Body() body: { name: string, email: string }, @Res() res: Response) {
        try {
            const user = await this.userService.GetUserByID({ _id, body });
            return res.status(HttpStatus.OK).json(user);
        } catch (error) {
            return res.status(HttpStatus.BAD_REQUEST).json(error);
        }
    }

    @Get('getEmailAllUsersInfor')
    async GetEmailAllUsersInfor(@Res() res: Response) {
        try {
            const responseDTO = await this.userService.GetEmailAllUsersInfor();
            return res.status(HttpStatus.OK).json(responseDTO);
        } catch (error) {
            return res.status(HttpStatus.BAD_REQUEST).json(error);
        }
    }

    @Post('updateInfoUser')
    async UpdateInfoUser(@Body() body: UserUpdateInfoRequestDTO, @Res() res: Response) {
        try {
            const user = await this.userService.UpdateInfoUser(body);
            return res.status(HttpStatus.OK).json(user);
        } catch (error) {
            return res.status(HttpStatus.BAD_REQUEST).json(error);
        }
    }

    @Post('UpdateActivitystatus')
    async UpdateActivitystatus(@Body() body: UserUpdateInfoRequestDTO, @Res() res: Response) {
        try {
            const user = await this.userService.UpdateActivitystatus(body);
            return res.status(HttpStatus.OK).json(user);
        } catch (error) {
            return res.status(HttpStatus.BAD_REQUEST).json(error);
        }
    }



}
