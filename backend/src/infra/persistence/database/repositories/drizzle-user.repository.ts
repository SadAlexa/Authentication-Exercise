import { usersTable } from '../entities/user.entity';
import { User } from 'src/domain/authentication/user';
import { sql } from 'drizzle-orm' 
import { Inject, Injectable } from '@nestjs/common';
import { UserRepository } from 'src/application/ports/user.reporitory';
import { DrizzleDatabase } from '../database.module';
import { UserMapper } from '../mapper/user.mapper';
import { DB_INJECTION_KEY } from '../../utils';

@Injectable()
export class UserRepositoryImpl implements UserRepository {

  constructor(
    @Inject(DB_INJECTION_KEY) private readonly db: DrizzleDatabase
  ) {}
  async create(user: User) {
    await this.db.insert(usersTable).values(UserMapper.toDatabase(user));

/*     await this.db.insert(usersTable).values([{
      name: "sdjsf",
      surname: "sdf",
      email: "sdf@sdf.t",
      image: "sdf",
      birthdate: new Date(),
      password: "sdfFHIFE&/&-ffef",
    }]); */
  }
  async findByEmailAndPassword(email: string, password: string): Promise<User | null> {
    const user = await this.db.query.usersTable.findFirst({ where: sql`${usersTable.email} = ${email} and ${usersTable.password} = ${password}` });
    return user ? UserMapper.toDomain(user) : null;
  }

}