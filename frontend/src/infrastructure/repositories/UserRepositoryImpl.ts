import { User } from "../../domain/entities/User";
import { UserRepistory } from "../../domain/repositories/UserRepository";
import { AuthApi } from "../api/AuthApi";

export class UserRepistoryIml implements UserRepistory {
    private authApi: AuthApi

    constructor() {
        this.authApi = new AuthApi()
    }
    async authenticate(email: string, password: string): Promise<User> {
        const response = await this.authApi.login(email, password);
        const userData = await response.json();
        return {
          name: userData.name,
          surname: userData.surname,
          email: userData.email,
          /* image: userData.image */
          password: userData.password
        };
      }

    async register(user: User): Promise<void> {
        await this.authApi.register(user.name, user.surname, user.email, /* user.image */ user.password);
    }

}