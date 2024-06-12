import { UserDocument } from './user.schema';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserResponseDTO } from './dto/user_response';
import { UserGetByIDResponseDTO } from './dto/getbyid-user.dto';
import { UserGetAllResponseDTO } from './dto/getall-user.dto';

export interface IUserService {
  GetUserByID(requestDTO: any): Promise<UserGetByIDResponseDTO | any>;
  UpdateUser(responseDTO: UpdateUserDto): Promise<UserResponseDTO>;
  findUserByName(name: string): Promise<UserDocument[]>;
  GetAllUsers(): Promise<UserGetAllResponseDTO[]>;
}
