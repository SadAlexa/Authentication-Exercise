import { UserRepistory } from "../../domain/repositories/UserRepository";

export class LogOutUser {
  constructor(private userRepository: UserRepistory) {}

  async execute() {
    return this.userRepository.logout();
  }
}
