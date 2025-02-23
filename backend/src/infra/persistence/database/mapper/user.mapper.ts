import { usersTable } from '../entities/user.entity';
import { User } from 'src/domain/authentication/user';
import { InferSelectModel } from 'drizzle-orm';

export type UserType = InferSelectModel<typeof usersTable>;
export class UserMapper {
  static toDomain(userEntity: UserType): User {
    const model = new User({
      id: userEntity.id,
      name: userEntity.name,
      surname: userEntity.surname,
      email: userEntity.email,
      /* birthdate: new Date(userEntity.birthdate), */
      image: userEntity.image ? userEntity.image : '',
      password: userEntity.password,
      /* salt: userEntity.salt, */
    });
    return model;
  }

  static toDatabase(user: User) {
    return {
      name: user.getName(),
      surname: user.getSurname(),
      email: user.getEmail(),
      /* birthdate: user.getBirthdate()}`, */
      password: user.getPassword(),
      /* salt: user.getSalt()}`, */
      /* image: user.getImage(), */
    };
  }
}
