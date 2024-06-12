import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema, Users } from './user.schema';
import { Services } from 'src/utils/constants';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Users.name, schema: UserSchema },
    ]),
  ],
  controllers: [UserController],
  providers: [
    {
      provide: Services.USERSERVICE,
      useClass: UserService,
    },
  ],
  exports: [
    {
      provide: Services.USERSERVICE,
      useClass: UserService,
    },
  ],
})
export class UserModule { }
