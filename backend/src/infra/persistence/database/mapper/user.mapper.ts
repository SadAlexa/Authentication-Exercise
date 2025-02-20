import { UserEntity, usersTable } from '../entities/user.entity';
import { User } from 'src/domain/authentication/user';
import { sql } from 'drizzle-orm/sql';
import { InferSelectModel } from 'drizzle-orm';

export type UserType = InferSelectModel<typeof usersTable>;
export class UserMapper {
    static toDomain(userEntity: UserType): User {
        const model = new User({
            id: userEntity.id.toString(),
            name: userEntity.name.toString(),
            surname: userEntity.surname.toString(),
            email: userEntity.email.toString(),
            birthdate: new Date(userEntity.birthdate.toString()),
            image: userEntity.image?.toString() || '',
            password: userEntity.password.toString(),
            /* salt: userEntity.salt.toString(), */
        });
        return model;
    }

    static toDatabase(user: User) {
        return {
          id: sql`${user.getId()}`,
          name: sql`${user.getName()}`,
          surname: sql`${user.getSurname()}`,
          email: sql`${user.getEmail()}`,
          birthdate: sql`${user.getBirthdate().toISOString()}`,
          password: sql`${user.getPassword()}`,
          /* salt: sql`${user.getSalt()}`, */
          image: sql`${user.getImage()}`,
        };
      }
}
