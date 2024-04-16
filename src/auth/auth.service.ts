import { Injectable } from '@nestjs/common';
import { UserInfoService } from "src/userInfo/userinfo.service";
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from './interfaces/jwt-payload.interface';


@Injectable()
export class AuthService {
    constructor(
        private userInfoService: UserInfoService,
    private readonly jwtService: JwtService,
    

    ) { }
    async signIn(request: any) {
        const { email, password } = request;
        const user = await this.userInfoService.LoginUser({ email });
        let comparePassword = bcrypt.compareSync(password, (await user).password);
        if (!comparePassword) {
            return {
                status: false,
                message: 'Wrong password'
            }
        }
        return {
            user,
            status: true,
        };
    }
    verifyToken(token: string) {
        return this.jwtService.verify<JwtPayload>(token);
      }

}
