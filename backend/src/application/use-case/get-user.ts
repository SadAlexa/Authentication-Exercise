import { HttpStatus, Inject, Injectable } from '@nestjs/common';
import { UserRepository } from '../ports/user.reporitory';
import { GetUserDto } from 'src/infra/http/dto/get.user.dto';
import { Response } from 'express';
import { User } from 'src/domain/authentication/user';

interface GetUserCommand {
  email: string;
  password: string;
}

@Injectable()
export class GetUserUseCase {
  constructor(
    @Inject(UserRepository) private readonly userRepository: UserRepository,
  ) {}

  async findByEmailAndPassword(
    { email, password }: GetUserCommand,
    res: Response,
  ): Promise<Response> {
    const data = await this.userRepository.findByEmailAndPassword(
      email,
      password,
    );
    res.cookie('authToken', data.accessToken);

    return res.status(HttpStatus.OK).json();
  }

  async findByEmail(email: string): Promise<User | undefined> {
    return await this.userRepository.findByEmail(email);
  }
}
