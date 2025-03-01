import { UserRepistory } from "../../domain/repositories/UserRepository";

export class AuthenticateUser {
  constructor(private userRepository: UserRepistory) {}

  async execute(email: string, password: string): Promise<void> {
    this.userRepository.authenticate(email, password);
  }
}
