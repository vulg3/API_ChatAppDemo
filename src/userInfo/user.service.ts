import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { UserInfoDocument, UsersInfo } from './user.schema';
import { UserInsertRequestDTO } from './dto/user_register_request';
import { UserInfoLoginRequestDTO } from './dto/user_login_request';
import { UserInfoForGotRequestDTO } from './dto/user_forgot_request';
import { UserInfoResponseDTO } from './dto/user_response';
import { UserInfoRegisterResponseDTO } from './dto/user_register_response';
import { UserInfoRequestDTO } from './dto/user_infor_request';
import { UserInfoSendMailRequestDTO } from './dto/user_sendmail_request';
import { UserInfo } from 'os';
import { MailerService } from '@nestjs-modules/mailer';

enum Salt {
  SALT = 10,
}

@Injectable()
export class UserInfoService {
  constructor(
    @InjectModel(UsersInfo.name)
    private readonly userModel: Model<UserInfoDocument>,
    private readonly mailerSerService: MailerService,
  ) { }

  async RegisterUser(
    requestDTO: UserInsertRequestDTO,
  ): Promise<UserInfoRegisterResponseDTO | UserInfoResponseDTO> {
    try {
      const { username, email, password } = requestDTO;
      const user = await this.userModel.findOne({ email });
      const name = await this.userModel.findOne({ username });

      if (user) {
        return {
          status: false,
          message: 'User already exists',
        };
      } else if (name) {
        return {
          status: false,
          message: 'Name already exists',
        };
      }
      const newUser = new this.userModel({
        username,
        email,
        password,
      });

      const { _id } = await newUser.save();
      return {
        status: true,
        message: 'Register successfully ',
        _id: _id,
      };
    } catch (error: any) {
      return {
        status: false,
        message: 'Failed' + error,
      };
    }
  }

  async LoginUser(
    requestDTO: UserInfoLoginRequestDTO,
  ): Promise<any | UserInfoResponseDTO> {
    try {
      const { email } = requestDTO;
      const user = await this.userModel.findOne({ email });
      if (!user) {
        return {
          status: false,
          message: 'User not found',
        };
      }

      return user;
    } catch (error: any) { }
  }

  async ForGotPass(
    requestDTO: UserInfoForGotRequestDTO,
  ): Promise<UserInfoResponseDTO> {
    try {
      const { email, newPassword } = requestDTO;
      const user = await this.userModel.findOne({ email });
      const hashPassword = await bcrypt.hash(newPassword, Salt.SALT);
      if (user) {
        (await user).password = hashPassword;
        (await user).save();
        return {
          status: true,
          message: 'Update password successfully',
        };
      } else {
        return {
          status: false,
          message: 'Update password failed',
        };
      }
    } catch (error) {
      return {
        status: false,
        message: 'Update password error',
      };
    }
  }

  async ChangePassword(requestDTO: any): Promise<UserInfoResponseDTO> {
    try {
      const { email, oldPassword, newPassword } = requestDTO;
      const user = await this.userModel.findOne({ email });
      let comparePassword = bcrypt.compareSync(
        oldPassword,
        (await user).password,
      );
      if (comparePassword) {
        const hashPassword = await bcrypt.hash(newPassword, Salt.SALT);
        (await user).password = hashPassword;
        (await user).save();
        return {
          status: true,
          message: 'Change password successfully',
        };
      } else {
        return {
          status: false,
          message: 'Change password failed',
        };
      }
    } catch (error) {
      return {
        status: false,
        message: 'Change password error',
      };
    }
  }

  async VerifyUser(
    requestDTO: UserInfoSendMailRequestDTO,
  ): Promise<UserInfoResponseDTO | any> {
    try {
      const { email } = requestDTO;
      const random = Math.floor(Math.random() * 1000000)
        .toString()
        .padStart(6, '0');
      const sendMail = this.mailerSerService.sendMail({
        to: email,
        from: `nongnong10122003@gmail.com`,
        subject: `Xác nhận tài khoản`,
        html: `
                <div style="font-family: Helvetica,Arial,sans-serif;min-width:1000px;overflow:auto;line-height:2">
                    <div style="margin:50px auto;width:70%;padding:20px 0">
                        <h2 style="background: #00466a;margin: 0 auto;width: max-content;padding: 0 10px;color: #fff;border-radius: 4px;">${random}</h2>
                        <hr style="border:none;border-top:1px solid #eee" />
                    </div>
                </div>
                `,
      });
      if (sendMail) {
        return {
          status: true,
          message: 'Send Mail successfully',
          random,
        };
      } else {
        return {
          status: false,
          message: 'send Mail Failed',
        };
      }
    } catch (error) {
      return {
        status: false,
        message: error,
      };
    }
  }

  async GetEmailAllUsersInfor(): Promise<UserInsertRequestDTO[]> {
    try {
      const listEmail: any = await this.userModel.find();
      return listEmail.map((user) => user.email);
    } catch (error) {
      return error;
    }
  }

  async UpdateInforUser(
    requestDTO: UserInsertRequestDTO | any,
  ): Promise<UserInfoResponseDTO | any> {
    try {
      const { _id, email = null, username = null } = requestDTO;
      const user = await this.userModel.findOne({ _id: _id });

      if (user) {
        user.email = email ? email : user.email;
        user.username = username ? username : user.username;
        await user.save();
        return {
          status: true,
          message: 'Update successfuly',
        };
      }
      return {
        status: false,
        message: 'Update faled',
      };
    } catch (error) {
      return {
        status: false,
        message: 'Update error: ' + error.message,
      };
    }
  }
}
