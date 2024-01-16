import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { UserDocument, Users } from './user.schema';
import { UserResponseDTO } from './dto/user_response';
import { UserGetByIDResponseDTO } from './dto/user_getByID_response';
import { UserGetAllResponseDTO } from './dto/user_getAll_response';
import { JwtService } from '@nestjs/jwt';
import { UserRegisterResponseDTO } from './dto/user_register_response';
import { UserUpdateInfoRequestDTO } from './dto/user_updateInfo_request';
import { UserSendMailRequestDTO } from './dto/user_sendmail_request';
import { MailerService } from '@nestjs-modules/mailer';
import { UserLoginRequestDTO } from './dto/user_login_request';
import { UserForGotRequestDTO } from './dto/user_forgot_request';
import { UserInsertRequestDTO } from './dto/user_register_request';



enum saltOrRounds {
    SALT = 10
}
enum Email {
    FORM = "Vũ Long DZ quá trời",
    SUBJECT = "Code verify your mail form ",
}

@Injectable()
export class UserService {
    constructor(@InjectModel(Users.name)
    private readonly userModel: Model<UserDocument>,
        private readonly jwtService: JwtService,
        private readonly mailerService: MailerService

    ) { }

    async RegisterUser(requestDTO: UserInsertRequestDTO): Promise<UserRegisterResponseDTO | UserResponseDTO> {
        try {

            const { name, email, password } = requestDTO;
            const user = await this.userModel.findOne({ email });
            if (user) {
                return {
                    status: false,
                    message: 'User already exists',
                }
            }
            const hashPassword = await bcrypt.hash(password, saltOrRounds.SALT);
            const newUser = new this.userModel({
                name,
                email,
                password: hashPassword,
            })

            const { _id } = await newUser.save();
            return {
                status: true,
                message: 'Register successfully ',
                _id: _id

            }
        } catch (error: any) {
            return {
                status: false,
                message: 'Failed' + error,
            }
        }
    }
    async LoginUser(requestDTO: UserLoginRequestDTO): Promise<any | UserResponseDTO> {
        try {
            const { email } = requestDTO;
            const user = await this.userModel.findOne({ email });
            if (!user) {
                return {
                    status: false,
                    message: 'User not found',
                }
            }
            return user;
        } catch (error: any) {
        }
    }

    async ForGotPass(requestDTO: UserForGotRequestDTO): Promise<UserResponseDTO> {
        try {
            const { email, newPassword } = requestDTO;
            const user = await this.userModel.findOne({ email });
            const hashPassword = await bcrypt.hash(newPassword, saltOrRounds.SALT);
            if (user) {
                (await user).password = hashPassword;
                (await user).save();
                return {
                    status: true,
                    message: 'Update password successfully',
                }
            } else {
                return {
                    status: false,
                    message: 'Update password failed',
                }
            }

        } catch (error) {
            return {
                status: false,
                message: 'Update password error',
            }
        }
    }


    async ChangePassword(requestDTO: any): Promise<UserResponseDTO> {
        try {
            const { email, oldPassword, newPassword } = requestDTO;
            const user = await this.userModel.findOne({ email });
            let comparePassword = bcrypt.compareSync(oldPassword, (await user).password);
            if (comparePassword) {
                const hashPassword = await bcrypt.hash(newPassword, saltOrRounds.SALT);
                (await user).password = hashPassword;
                (await user).save();
                return {
                    status: true,
                    message: 'Change password successfully',
                }
            } else {
                return {
                    status: false,
                    message: 'Change password failed',
                }
            }
        } catch (error) {
            return {
                status: false,
                message: 'Change password error',
            }
        }
    }
    async VerifyUser(requestDTO: UserSendMailRequestDTO): Promise<UserResponseDTO | any> {
        try {
            const { email } = requestDTO;
            const random = Math.floor((Math.random() * (999999 - 100000)) + 100000);
            const sendMail = this.mailerService.sendMail({
                to: email, // list of receivers
                from: Email.FORM, // sender address
                subject: Email.SUBJECT, // Subject line
                html: `
                    <div style="font-family: Helvetica,Arial,sans-serif;min-width:1000px;overflow:auto;line-height:2">
                        <div style="margin:50px auto;width:70%;padding:20px 0">
                            <div style="border-bottom:1px solid #eee">
                            <a href="" style="font-size:1.4em;color: #00466a;text-decoration:none;font-weight:600">Ứng dụng của long Đz</a>
                            </div>
                            <h2 style="background: #00466a;margin: 0 auto;width: max-content;padding: 0 10px;color: #fff;border-radius: 4px;">${random}</h2>
                            </div>
                        </div>
                </div>
                `, // HTML body content
            })
            if (sendMail) {
                return {
                    status: true,
                    message: 'SendMail successfully',
                    random,
                }
            } else {
                return {
                    status: false,
                    message: 'SendMail Failed',
                }
            }
        } catch (error) {
            return {
                status: false,
                message: error,
            }
        }
    }

    
    //Hàm insert vào database
    async GetUserByID(requestDTO: any): Promise<UserGetByIDResponseDTO | any> {
        try {
            const { _id, body } = requestDTO;
            const { name, email } = body;
            const user = await this.userModel.findOne({ _idUser: _id });
            if (user) {
                const payload = { sub: user._id, name: user.name };
                return {
                    status: true,
                    message: 'Get User successfully',
                    data: user,
                    access_token: await this.jwtService.signAsync(payload),
                }
            }
            let newUser = new this.userModel({ _idUser: _id, name, email, phone: null, active: true, avatar: null, gender: null, birthDay: null });
            await newUser.save();
            return {
                status: true,
                message: 'New User',
                data: newUser,
                access_token: await this.jwtService.signAsync({ sub: newUser._id, name: newUser.name }),
            }
        } catch (error) {
            console.log(error);

            return {
                status: false,
                message: 'Get User error',
                data: null,
            }
        }

    }


    async UpdateInfoUser(requestDTO: UserUpdateInfoRequestDTO | any): Promise<UserResponseDTO> {
        try {
            const { _id, name = null, phone = null, avatar = null, gender = null, birthDay = null, email = null } = requestDTO;
            const user = await this.userModel.findOne({ _idUser: _id });
            if (user) {
                user.name = name ? name : user.name;
                user.phone = phone ? phone : user.phone;
                user.avatar = avatar ? avatar : user.avatar;
                user.gender = gender ? gender : user.gender;
                user.birthDay = birthDay ? birthDay : user.birthDay;
                user.email = email ? email : user.email;
                await user.save();
                return {
                    status: true,
                    message: 'Update User successfully'
                }
            }
            return {
                status: false,
                message: 'Update User failed'
            }
        } catch (error) {
            return {
                status: false,
                message: 'Update favoUserrite error'
            }
        }
    }

    async UpdateActivitystatus(requestDTO: UserUpdateInfoRequestDTO | any): Promise<UserResponseDTO> {
        try {
            const { _id, isOnline = 2} = requestDTO;
            const user = await this.userModel.findOne({ _idUser: _id });
            if (user) {
                user.isOnline = isOnline ? isOnline : user.isOnline;
                await user.save();
                return {
                    status: true,
                    message: 'Update User successfully'
                }
            }
            return {
                status: false,
                message: 'Update User failed'
            }
        } catch (error) {
            return {
                status: false,
                message: 'Update favoUserrite error'
            }
        }
    }

    async GetAllUsers(): Promise<UserGetAllResponseDTO[]>{
        try {
            const responseDTO = await this.userModel.find();
            return responseDTO;
        } catch (error) {
            return error;
        }
    }

    async GetEmailAllUsersInfor(): Promise<UserInsertRequestDTO[]> {
        try {
            const listEmail: any = await this.userModel.find();
            return listEmail.map(user => user.email);
        } catch (error) {
            return error;
        }
    }


}
