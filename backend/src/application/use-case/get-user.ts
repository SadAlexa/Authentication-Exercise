import { HttpStatus, Inject, Injectable } from '@nestjs/common';
import { UserRepository } from '../ports/user.reporitory';
import { GetUserDto } from 'src/infra/http/dto/get.user.dto';
import { Response } from 'express';

@Injectable()
export class GetUserUseCase {
  constructor(
    @Inject(UserRepository) private readonly userRepository: UserRepository,
  ) {}

  async execute(getUserDto: GetUserDto, res: Response): Promise<Response> {
    const data = await this.userRepository.findByEmailAndPassword(
      getUserDto.email,
      getUserDto.password,
    );
    res.cookie('authToken', data.accessToken);

    return res.status(HttpStatus.OK).json();
  }
}
