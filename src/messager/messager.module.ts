import { Module } from '@nestjs/common';
import { MessagerGateway } from './messager.gateway';
import { MessagerService } from './messager.service';

@Module({
    providers: [MessagerGateway, MessagerService]
})
export class MessagerModule { }
