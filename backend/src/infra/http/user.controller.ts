import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  Res,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CreateUserUseCase } from 'src/application/use-case/create-user';
import { GetUserUseCase } from 'src/application/use-case/get-user';
import { CreateUserDto } from './dto/create.user.dto';
import { GetUserDto } from './dto/get.user.dto';
import { LogoutUseCase } from 'src/application/use-case/logout-user';
import { Response } from 'express';

@Controller('/')
@ApiTags('User')
export class UserController {
  constructor(
    private createUserUseCase: CreateUserUseCase,
    private getUserUseCase: GetUserUseCase,
    private logoutUserUseCase: LogoutUseCase,
  ) {}

  @HttpCode(HttpStatus.OK)
  @Post('/login')
  getUser(
    @Body() getUserDto: GetUserDto,
    @Res() res: Response,
  ): Promise<{ accessToken: string }> {
    return this.getUserUseCase.execute(getUserDto, res);
  }

  @Post('/logout')
  logoutUser(@Res() res: Response) {
    this.logoutUserUseCase.execute(res);
  }

  @HttpCode(HttpStatus.OK)
  @Post('/register')
  createUser(@Body() createUserDto: CreateUserDto): Promise<void> {
    return this.createUserUseCase.execute(createUserDto);
  }
}
