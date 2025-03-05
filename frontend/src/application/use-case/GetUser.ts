import { User } from "../../domain/entities/User";
import { UserRepistory } from "../../domain/repositories/UserRepository";

export class GetUser {
  constructor(private userRepository: UserRepistory) {}

  async execute(authToken: string): Promise<User | undefined> {
    return this.userRepository.fethUserData(authToken);
  }
}
