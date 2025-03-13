import {
  Controller,
  Post,
  Body,
  Get,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { CreateAccessLogDto } from './dto/create.access.log.dto';
import { CreateAccessLogUseCase } from 'src/application/use-case/create-access-log';
import { GetAccessLogUseCase } from 'src/application/use-case/get-access-log';
import { AccessLog } from 'src/domain/log/access-log';
import { GetAccessLogDto } from './dto/get.access.log.dto';

@Controller('access-logs')
export class AccessLogController {
  constructor(
    private readonly createAccessLogUseCase: CreateAccessLogUseCase,
    private readonly getAccessLogUseCase: GetAccessLogUseCase,
  ) {}

  @HttpCode(HttpStatus.OK)
  @Post()
  async logAccess(
    @Body() createAccessLogDto: CreateAccessLogDto,
  ): Promise<void> {
    this.createAccessLogUseCase.createlogAccess(createAccessLogDto);
  }

  @HttpCode(HttpStatus.OK)
  @Get()
  async getAccessLogs(
    @Body() GetAccessLogDto: GetAccessLogDto,
  ): Promise<AccessLog[]> {
    return this.getAccessLogUseCase.getAccessLogs(GetAccessLogDto);
  }
}
