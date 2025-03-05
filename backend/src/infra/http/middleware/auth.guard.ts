import { Inject, Injectable } from '@nestjs/common';
import { UserRepository } from 'src/application/ports/user.reporitory';

@Injectable()
export class AuthGuard {
  constructor(
    @Inject(UserRepository) private readonly userRepository: UserRepository,
  ) {}
  async canActivate(context) {
    const request = context.switchToHttp().getRequest();
    const user = await this.userRepository.verifyToken(
      request.cookies['authToken'],
    );
    if (!user) {
      return false;
    }
    request.user = user;
    return true;
  }
}
