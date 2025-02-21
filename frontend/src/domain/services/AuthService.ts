import { UserRepistory } from "../../domain/repositories/UserRepository";
import { User } from "../entities/User";

export class AuthService {
  private userRepository: UserRepistory;

  constructor(userRepository: UserRepistory) {
    this.userRepository = userRepository;
  }

  async login(email: string, password: string): Promise<User> {
    const user = await this.userRepository.authenticate(email, password);
    this.storeToken(user);
    return user;
  }

  async register(
    name: string,
    surname: string,
    email: string,
    /* dateOfBirth: Date, */
    /* image: string, */
    password: string
  ): Promise<void> {
    await this.userRepository.register({
      name,
      surname,
      email,
      /* image, */
      password
    });
  }

  logout(): void {
    localStorage.removeItem('authToken');
  }

  isAuthenticated(): boolean {
    const token = localStorage.getItem('authToken');
    return !!token;
  }

  private storeToken(user: User): void {
    localStorage.setItem('authToken', user.token || ''); 
  }
}