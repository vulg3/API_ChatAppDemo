import { User } from "../user.entity";

export class UserGetByIDResponseDTO {
    status: boolean;
    message: string;
    data: User;
}