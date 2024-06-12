import { Body, Controller, Delete, Get, Inject, Param, Post, Query, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/interfaces/jwt-auth.guard';
import { CreateMessageDto } from './dto/create-message.dto';
import { MessagerService } from './messager.service';
import { GetMessagesDto } from './dto/get-message.dto';
import { Services } from 'src/utils/constants';
import { IMessagerService } from './messager';

@Controller('messages')
@UseGuards(JwtAuthGuard)
export class MessageController {
  constructor(
    @Inject(Services.MESSAGESSERVICES)
    private readonly messageService: IMessagerService,
  ) {}
  
  @Post()
  createMessages(@Body() createMessageDto: CreateMessageDto) {
    return this.messageService.createMessage(createMessageDto);
  }

  @Delete(':id')
  deleteMessage(@Param('id') messID: string) {
    return this.messageService.deleteMessage(messID);
  }
}
