import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber } from 'class-validator';

export class GetAccessLogDto {
  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  userId: number;
}
