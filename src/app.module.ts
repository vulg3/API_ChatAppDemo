import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ChatGateway } from './messager/chat.gateway';

@Module({
  imports: [
    // MongooseModule.forRoot('mongodb+srv://0355951656:<password>@cluster0.kk5uol1.mongodb.net/?retryWrites=true&w=majority'),
  
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
