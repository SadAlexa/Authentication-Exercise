import { ExecutionContext, Inject, Injectable } from '@nestjs/common';
import { UserRepository } from 'src/application/ports/user.reporitory';

@Injectable()
export class AuthGuard {
  constructor(
    @Inject(UserRepository) private readonly userRepository: UserRepository,
  ) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = request.cookies['authToken'];
    try {
      const user = await this.userRepository.verifyToken(token);
      request.user = user;
      return true;
    } catch (error) {
      return false;
    }
  }
}
