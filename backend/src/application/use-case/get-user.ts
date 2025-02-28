import { Inject, Injectable } from '@nestjs/common';
import { UserRepository } from '../ports/user.reporitory';
import { GetUserDto } from 'src/infra/http/dto/get.user.dto';
import { Response } from 'express';
import { User } from 'src/domain/authentication/user';

@Injectable()
export class GetUserUseCase {
  constructor(
    @Inject(UserRepository) private readonly userRepository: UserRepository,
  ) {}

  async execute(
    getUserDto: GetUserDto,
    res: Response,
  ): Promise<{ accessToken: string; user: User }> {
    const data = await this.userRepository.findByEmailAndPassword(
      getUserDto.email,
      getUserDto.password,
    );
    res.cookie('authToken', data.accessToken);
    return {
      accessToken: data.accessToken,
      user: data.user,
    };
  }
}
