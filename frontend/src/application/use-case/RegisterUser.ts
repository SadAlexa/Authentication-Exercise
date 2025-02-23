import { UserRepistory } from "../../domain/repositories/UserRepository";

export class RegisterUser {
  constructor(private userRepository: UserRepistory) {}

  async execute(
    name: string,
    surname: string,
    email: string,
    password: string
  ): Promise<void> {
    return this.userRepository.register({ name, surname, email, password });
  }
}
