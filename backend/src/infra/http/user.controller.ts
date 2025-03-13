import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Req,
  Res,
  UseGuards,
  Request,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CreateUserUseCase } from 'src/application/use-case/create-user';
import { GetUserUseCase } from 'src/application/use-case/get-user';
import { CreateUserDto } from './dto/create.user.dto';
import { GetUserDto } from './dto/get.user.dto';
import { LogoutUseCase } from 'src/application/use-case/logout-user';
import { Response } from 'express';
import { AuthGuard } from './middleware/auth.guard';
import { User } from 'src/domain/authentication/user';

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
  ): Promise<Response> {
    return this.getUserUseCase.findByEmailAndPassword(getUserDto, res);
  }

  @HttpCode(HttpStatus.OK)
  @Post('/logout')
  logoutUser(@Res() res: Response): Promise<void> {
    return this.logoutUserUseCase.execute(res);
  }

  @HttpCode(HttpStatus.OK)
  @Post('/register')
  createUser(@Body() createUserDto: CreateUserDto): Promise<void> {
    return this.createUserUseCase.execute(createUserDto);
  }

  @UseGuards(AuthGuard)
  @Get('/profile')
  getProfile(@Req() req): Promise<User | undefined> {
    return this.getUserUseCase.findByEmail(req.user.email);
  }
}
