import { PartialType } from '@nestjs/mapped-types';
import { CreateRoomResponseDTO } from './create-room.dto';

export class UpdateRoomDto extends PartialType(CreateRoomResponseDTO) {}
