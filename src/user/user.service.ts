import { Injectable } from '@nestjs/common';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { UserDocument, Users } from './user.schema';
import { Model } from 'mongoose';
import { JwtService } from '@nestjs/jwt';
import { UserGetAllResponseDTO } from './dto/getall-user.dto';
import { UserGetByIDResponseDTO } from './dto/getbyid-user.dto';
import { UserResponseDTO } from './dto/user_response';

@Injectable()
export class UserService {
  constructor(@InjectModel(Users.name)
  private readonly userModel: Model<UserDocument>,
    private readonly jwtService: JwtService
  ) { }

  async GetUserByID(requestDTO: any): Promise<UserGetByIDResponseDTO | any> {
    try {
      const { _id, body } = requestDTO;
      const { name, email } = body;
      const user = await this.userModel.findOne({ _idUser: _id }).populate('listChat');

      if (user) {
        const payload = { sub: user._id, name: user.name };
        return {
          status: true,
          message: 'Get user successfully',
          data: user,
          access_token: await this.jwtService.signAsync(payload),
        }
      }
      let newUser = new this.userModel({ _idUser: _id, name, email, phonenumber: null, avatar: null, listChat: [], birthDate: null });
      await newUser.save();
      return {
        status: true,
        message: 'Add user successfully',
        data: newUser,
        access_token: await this.jwtService.signAsync({ sub: newUser._id, name: newUser.name }),
      }

    } catch (error) {

      console.log(error);
      return {
        status: false,
        message: 'Get user error',
        data: null,

      }
    }
  }

  async UpdateUser(responseDTO: UpdateUserDto): Promise<UserResponseDTO> {
    try {
      const { _id, name = null, phonenumber = null, avatar = null, birthDate = null, listChat = [] , room  , active} = responseDTO;
      const user = await this.userModel.findOne({ _idUser: _id });
      if (user) {
        user.name = name ? name : user.name;
        user.phonenumber = phonenumber ? phonenumber : user.phonenumber;
        user.avatar = avatar ? avatar : user.avatar;
        user.birthDate = birthDate ? birthDate : user.birthDate;
        user.listChat = listChat;
        user.room = room ;
        user.active = active;

        await user.save();
        return {
          status: true,
          message: 'Update User successfully'
        }
      }
    } catch (error) {
      return {
        status: false,
        message: 'Error updating user',
      }
    }

  }


}
