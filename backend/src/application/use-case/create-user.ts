import { Inject, Injectable } from '@nestjs/common';
import { UserRepository } from '../ports/user.reporitory';
import { User } from 'src/domain/authentication/user';

interface CreateUserCommand {
  name: string;
  surname: string;
  /*  birthdate: Date; */
  image: string;
  email: string;
  password: string;
}

@Injectable()
export class CreateUserUseCase {
  constructor(
    @Inject(UserRepository) private readonly userRepository: UserRepository,
  ) {}

  async execute({
    name,
    surname,
    /*   birthdate, */
    image,
    email,
    password,
  }: CreateUserCommand): Promise<any> {
    const user = new User({
      name,
      surname,
      /*  birthdate, */
      image,
      email,
      password,
    });

    const response = await this.userRepository.create(user);
    return response;
  }
}
