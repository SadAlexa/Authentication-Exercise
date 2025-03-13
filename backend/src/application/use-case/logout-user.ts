import { Inject, Injectable } from '@nestjs/common';
import { Response } from 'express';
import { UserRepository } from '../ports/user.reporitory';

@Injectable()
export class LogoutUseCase {
  constructor(
    @Inject(UserRepository) private readonly userRepository: UserRepository,
  ) {}
  async execute(res: Response): Promise<void> {
    await this.userRepository.logoutUser(res);
  }
}
