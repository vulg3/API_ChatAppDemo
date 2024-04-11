import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserInfoResponseDTO } from 'src/userInfo/dto/user_response';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
    constructor(private readonly authService: AuthService) {
        super({
            usernameField: 'email', 
            passwordField: 'password',
        });
    }
    async validate(email: string, password: string) {
        const user: UserInfoResponseDTO | any = await this.authService.signIn({ email, password });
        return user;
    }
}