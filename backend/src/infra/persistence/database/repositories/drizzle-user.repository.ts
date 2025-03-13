import { usersTable } from '../entities/user.entity';
import { User } from 'src/domain/authentication/user';
import {
  BadRequestException,
  HttpStatus,
  Inject,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { UserRepository } from 'src/application/ports/user.reporitory';
import { DrizzleDatabase } from '../database.module';
import { UserMapper } from '../mapper/user.mapper';
import { DB_INJECTION_KEY } from '../../utils';
import * as bcrypt from 'bcrypt';
import { JsonWebTokenError, JwtService } from '@nestjs/jwt';
import { eq } from 'drizzle-orm';
import { Response } from 'express';

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
  async findByEmail(email: string): Promise<User | undefined> {
    const user = await this.db.query.usersTable.findFirst({
      where: eq(usersTable.email, email),
    });
    if (!user) {
      return undefined;
    }
    return user ? UserMapper.toDomain(user) : undefined;
  }
  async logoutUser(res: Response): Promise<void> {
    res.clearCookie('authToken');
    res.status(HttpStatus.OK).send();
  }
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
    throw new BadRequestException('Invalid credentials');
  }

  async verifyToken(token: string): Promise<JwtPayload> {
    try {
      const payload: JwtPayload = await this.jwtService.verifyAsync(token);
      return payload;
    } catch (error) {
      if (error instanceof JsonWebTokenError) {
        throw new UnauthorizedException('Invalid token');
      } else {
        throw error;
      }
    }
  }
}
