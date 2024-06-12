import { Injectable } from '@nestjs/common';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { UserDocument, Users } from './user.schema';
import { Model } from 'mongoose';
import { JwtService } from '@nestjs/jwt';
import { UserGetByIDResponseDTO } from './dto/getbyid-user.dto';
import { UserResponseDTO } from './dto/user_response';
import { IUserService } from './user';
import { UserGetAllResponseDTO } from './dto/getall-user.dto';

@Injectable()
export class UserService implements IUserService {
  constructor(@InjectModel(Users.name)
  private readonly userModel: Model<UserDocument>,
    private readonly jwtService: JwtService,
  ) { }

  async GetUserByID(requestDTO: any): Promise<UserGetByIDResponseDTO | any> {
    try {
      const { _id, body } = requestDTO;
      const { name, email } = body;
      const user = await this.userModel.findOne({ _idUser: _id }).populate('listChat');

      if (user) {
        const payload = { sub: user._id, name: user.name };
        const token = await this.jwtService.signAsync(payload);
        return {
          status: true,
          message: 'Get user successfully',
          data: user,
          access_token: token,
        }
      }
      let newUser = new this.userModel({ _idUser: _id, name, email, phonenumber: null, avatar: 'https://cdn.sforum.vn/sforum/wp-content/uploads/2023/10/avatar-trang-4.jpg', birthDate: null, status: null, listChat: [], room: [], active: true });
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
      const { _id, name = null, phonenumber = null, avatar = null, birthDate = null, listChat = [], room = [], status = null } = responseDTO;
      const user = await this.userModel.findOne({ _idUser: _id });
      if (user) {
        user.name = name ? name : user.name;
        user.phonenumber = phonenumber ? phonenumber : user.phonenumber;
        user.avatar = avatar ? avatar : user.avatar;
        user.birthDate = birthDate ? birthDate : user.birthDate;
        user.status = status ? status : user.status;
        user.listChat = listChat;
        user.room = room;
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

  async findUserByName(name: string): Promise<UserDocument[]> {
    try {
      const regex = new RegExp(name, 'i'); // 'i' cho phép không phân biệt chữ hoa thường
      const users = await this.userModel.find({ name: { $regex: regex } });
      return users;
    } catch (error) {
      throw new Error('Đã xảy ra lỗi khi tìm kiếm người dùng theo tên gần giống.');
    }
  }

  async GetAllUsers(): Promise<UserGetAllResponseDTO[]> {
    const page: number = 1;
    const limit: number = 10;
    try {
      const responseDTO = await this.userModel.find()
        .limit(limit)
        .skip((page - 1) * limit);
      return responseDTO;
    } catch (error) {
      return error;
    }
  }


}
