import { AuthenticateUser } from "../../application/use-case/AuthenticateUser";
import { RegisterUser } from "../../application/use-case/RegisterUser";

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

  async login(email: string, password: string): Promise<void> {
    await this.authenticateUserUseCase.execute(email, password);
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

  async logout(): Promise<void> {
    await this.authenticateUserUseCase.execute("", "");
  }

  isAuthenticated(): boolean {
    const token = document.cookie
      .split(";")
      .find((c) => c.trim().startsWith("authToken="))
      ?.split("=")[1];
    return !!token;
  }

  private storeToken(accessToken: string): void {
    document.cookie = `authToken=${accessToken}; path=/;`;
  }
}
