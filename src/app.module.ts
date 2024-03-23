import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UserInfoModule } from './userInfo/user.module';
import { MessagerService } from './messager/messager.service';
import { MessagerGateway } from './messager/messager.gateway';
import { MessagerModule } from './messager/messager.module';
import { UserService } from './user/user.service';
import { JwtModule } from '@nestjs/jwt';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb+srv://0355951656:0355951656@cluster0.kk5uol1.mongodb.net/?retryWrites=true&w=majority'),
    UserInfoModule, MessagerModule, AuthModule , UserModule,
    JwtModule.register({
      global: true,
      secret: 'blabla blo blo',
      signOptions: { expiresIn: '1d' },
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
