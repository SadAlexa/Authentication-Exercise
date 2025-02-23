import { AuthenticateUser } from "../../application/use-case/AuthenticateUser";
import { RegisterUser } from "../../application/use-case/RegisterUser";
import { User } from "../entities/User";

export class AuthService {
  private authenticateUserUseCase: AuthenticateUser;
  private registerUserUseCase: RegisterUser;

  constructor(
    authenticateUserUseCase: AuthenticateUser,
    registerUserUseCase: RegisterUser
  ) {
    this.authenticateUserUseCase = authenticateUserUseCase;
    this.registerUserUseCase = registerUserUseCase;
  }

  async login(email: string, password: string): Promise<User> {
    const user = await this.authenticateUserUseCase.execute(email, password);
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
    await this.registerUserUseCase.execute(
      name,
      surname,
      email,
      /* image, */
      password
    );
  }

  logout(): void {
    localStorage.removeItem("authToken");
  }

  isAuthenticated(): boolean {
    const token = localStorage.getItem("authToken");
    return !!token;
  }

  private storeToken(user: User): void {
    localStorage.setItem("authToken", user.token || "");
  }
}
