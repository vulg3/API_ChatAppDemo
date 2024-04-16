import { Body, Controller, Delete, Get, Param, Post, Query, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/interfaces/jwt-auth.guard';
import { CreateMessageDto } from './dto/create-message.dto';
import { MessagerService } from './messager.service';
import { GetMessagesDto } from './dto/get-message.dto';

@Controller('messages')
@UseGuards(JwtAuthGuard)
export class MessageController {
  constructor(private readonly messageService: MessagerService) {}
  
  @Post()
  createMessages(@Body() createMessageDto: CreateMessageDto) {
    return this.messageService.createMessage(createMessageDto);
  }

  @Delete(':id')
  deleteMessage(@Param('id') messID: string) {
    return this.messageService.deleteMessage(messID);
  }
}
