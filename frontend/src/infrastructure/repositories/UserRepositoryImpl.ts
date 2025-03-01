import { User } from "../../domain/entities/User";
import { UserRepistory } from "../../domain/repositories/UserRepository";
import { AuthApi } from "../api/AuthApi";

export class UserRepistoryIml implements UserRepistory {
  private authApi: AuthApi;

  constructor() {
    this.authApi = new AuthApi();
  }
  async logout(): Promise<void> {
    return this.authApi.logout();
  }
  async authenticate(email: string, password: string): Promise<void> {
    await this.authApi.login(email, password);
  }

  async register(user: User): Promise<void> {
    await this.authApi.register(
      user.name,
      user.surname,
      user.email,
      /* user.image */ user.password
    );
  }
}
