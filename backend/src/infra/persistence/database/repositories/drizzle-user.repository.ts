import { usersTable } from '../entities/user.entity';
import { User } from 'src/domain/authentication/user';
import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { UserRepository } from 'src/application/ports/user.reporitory';
import { DrizzleDatabase } from '../database.module';
import { UserMapper } from '../mapper/user.mapper';
import { DB_INJECTION_KEY } from '../../utils';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { eq } from 'drizzle-orm';

interface JwtPayload {
  email: string;
  password: string;
}

@Injectable()
export class UserRepositoryImpl implements UserRepository {
  constructor(
    @Inject(DB_INJECTION_KEY) private readonly db: DrizzleDatabase,
    private jwtService: JwtService,
  ) {}
  async create(user: User) {
    const salt = Math.random().toString(36).substring(2, 15);
    const hashedPassword = await bcrypt.hash(user.getPassword() + salt, 10);
    await this.db
      .insert(usersTable)
      .values(UserMapper.toDatabase(user, hashedPassword, salt));
  }

  async findByEmailAndPassword(
    email: string,
    password: string,
  ): Promise<{ accessToken: string }> {
    const user = await this.db.query.usersTable.findFirst({
      where: eq(usersTable.email, email),
    });
    if (user && (await bcrypt.compare(password + user.salt, user.password))) {
      const payload: JwtPayload = {
        email: user.email,
        password: user.password,
      };
      return {
        accessToken: await this.jwtService.signAsync(payload),
      };
    }
    throw new UnauthorizedException();
  }

  async verifyToken(token: string): Promise<JwtPayload> {
    const payload: JwtPayload = await this.jwtService.verifyAsync(token);
    return payload;
  }
}
