import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UserInfoModule } from 'src/userInfo/userinfo.module';
import { PassportModule } from "@nestjs/passport";
import { SessionSerializer } from './session';
import { LocalStrategy } from './local.strategy';
@Module({
  imports:[
    UserInfoModule,
    PassportModule
  ],
  controllers: [AuthController],
  providers: [AuthService, SessionSerializer ,LocalStrategy],
  exports: [AuthService],

})
export class AuthModule {}
