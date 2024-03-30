import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { UserInfoController } from './userinfo.controller';
import { UserInfoSchema, UsersInfo } from './userinfo.schema';
import { UserInfoService } from "./userinfo.service";
import { MailerModule } from "@nestjs-modules/mailer";


@Module({
    imports: [
        MongooseModule.forFeature([
            { name: UsersInfo.name, schema: UserInfoSchema },
        ]),
        MailerModule.forRoot({
            transport: {
                service:'gmail',
                host: 'smtp.gmail.com',
                port: 465,
                secure: true,
                auth: {
                  user: 'nongnong10122003@gmail.com',
                  pass: 'olbn lxjj ntzi ybps',
                },
              },
        }),

    ],
    controllers: [UserInfoController],
    providers: [UserInfoService],
    exports: [UserInfoService]
})
export class UserInfoModule { }