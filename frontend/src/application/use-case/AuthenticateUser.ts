import { User } from "../../domain/entities/User";
import { UserRepistory } from "../../domain/repositories/UserRepository";

export class AuthenticateUser {
  constructor(private userRepository: UserRepistory) {}

  async execute(
    email: string,
    password: string
  ): Promise<{ accessToken: string; user: User }> {
    return this.userRepository.authenticate(email, password);
  }
}
