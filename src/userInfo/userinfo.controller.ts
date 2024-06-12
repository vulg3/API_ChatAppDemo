import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Query,
  Res,
  HttpStatus,
  HttpCode,
  Render,
} from '@nestjs/common';
import { UserInsertRequestDTO } from './dto/user_register_request';
import { UserInfoLoginRequestDTO } from './dto/user_login_request';
import { UserInfoForGotRequestDTO } from './dto/user_forgot_request';
import { UserInfoService } from './userinfo.service';
import { Response } from 'express';
import { UserInfoSendMailRequestDTO } from './dto/user_sendmail_request';

//Url: http://localhost:3000/usersInfo
@Controller('usersInfo')
export class UserInfoController {
  constructor(private readonly userInfoService: UserInfoService) {}

  //Url: http://localhost:3000/usersInfo/RegisterUser
  @Post('RegisterUser')
  async RegisterUser(@Body() body: UserInsertRequestDTO, @Res() res: any) {
    try {
      const responseDTO = await this.userInfoService.RegisterUser(body);
      return res.status(HttpStatus.OK).json(responseDTO);
    } catch (error: any) {
      return res.status(HttpStatus.BAD_REQUEST).json(error);
    }
  }

  //Url: http://localhost:3000/usersInfo/LoginUser
  @Post('LoginUser')
  async LoginUser(@Body() body: UserInfoLoginRequestDTO, @Res() res: any) {
    try {
      const responseDTO = await this.userInfoService.LoginUser(body);
      return res.status(HttpStatus.OK).json(responseDTO);
    } catch (error: any) {
      return res.status(HttpStatus.BAD_REQUEST).json(error);
    }
  }

  //Url: http://localhost:3000/usersInfo/ForgotPassword
  @Post('ForgotPassword')
  async ForGotPass(@Body() body: UserInfoForGotRequestDTO, @Res() res: any) {
    try {
      const responseDTO = await this.userInfoService.ForGotPass(body);
      return res.status(HttpStatus.OK).json(responseDTO);
    } catch (error: any) {
      return res.status(HttpStatus.BAD_REQUEST).json(error);
    }
  }

  @Post('ChangePassword')
  async ChangePassword(@Body() body: any, @Res() res: any) {
    try {
      const responseDTO = await this.userInfoService.ChangePassword(body);
      return res.status(HttpStatus.OK).json(responseDTO);
    } catch (error: any) {
      return res.status(HttpStatus.BAD_REQUEST).json(error);
    }
  }
  //  http://localhost:3000/usersInfo/VerifyEmail
  @Post('VerifyEmail')
  async SendMail(@Body() body: UserInfoSendMailRequestDTO, @Res() res: any) {
    try {
      const ResponseDTO = await this.userInfoService.VerifyUser(body);
      return res.status(HttpStatus.OK).json(ResponseDTO);
    } catch (error) {
      return res.status(HttpStatus.BAD_REQUEST).json(error);
    }
  }

  @Get('getEmailAllUsersInfor')
  async GetEmailAllUsersInfor(@Res() res: Response) {
    try {
      const responseDTO = await this.userInfoService.GetEmailAllUsersInfor();
      return res.status(HttpStatus.OK).json(responseDTO);
    } catch (error) {
      return res.status(HttpStatus.BAD_REQUEST).json(error);
    }
  }

  @Post('updateUserInfo')
  async updateUser(@Body() body: UserInsertRequestDTO, @Res() res: Response) {
    try {
      const user = await this.userInfoService.UpdateInforUser(body);
      return res.status(HttpStatus.OK).json(user);
    } catch (error) {
      return res.status(HttpStatus.BAD_REQUEST).json
    }
  }
}
