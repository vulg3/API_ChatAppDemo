import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { UserSchema, Users } from './user.schema';
import { MailerModule } from "@nestjs-modules/mailer";


@Module({
    imports: [
        MongooseModule.forFeature([
            { name: Users.name, schema: UserSchema },
        ]),
    ],
    controllers: [UserController],
    providers: [UserService],
    
})
export class UserModule { }