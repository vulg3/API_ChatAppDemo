import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UserInfoModule } from 'src/userInfo/userinfo.module';
import { PassportModule } from "@nestjs/passport";
import { SessionSerializer } from './session';
@Module({
  imports:[
    UserInfoModule,
    PassportModule
  ],
  controllers: [AuthController],
  providers: [AuthService, SessionSerializer],
  exports: [AuthService],

})
export class AuthModule {}
