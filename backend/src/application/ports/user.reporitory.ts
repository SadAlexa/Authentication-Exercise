import { User } from 'src/domain/authentication/user';
import { Response } from 'express';

export abstract class UserRepository {
  abstract create(user: User): Promise<void>;
  abstract findByEmailAndPassword(
    email: string,
    password: string,
  ): Promise<{ accessToken: string }>;

  abstract findByEmail(email: string): Promise<User | undefined>;
  abstract verifyToken(token: string): Promise<any>;

  abstract logoutUser(res: Response): Promise<void>;
}
