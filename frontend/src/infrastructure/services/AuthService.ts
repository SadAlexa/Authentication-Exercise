import { AuthenticateUser } from "../../application/use-case/AuthenticateUser";
import { LogOutUser } from "../../application/use-case/LogOutUser";
import { RegisterUser } from "../../application/use-case/RegisterUser";

export class AuthService {
  private authenticateUserUseCase: AuthenticateUser;
  private registerUserUseCase: RegisterUser;
  private logoutUserUseCase: LogOutUser;

  constructor(
    authenticateUserUseCase: AuthenticateUser,
    registerUserUseCase: RegisterUser,
    logoutUserUseCase: LogOutUser
  ) {
    this.authenticateUserUseCase = authenticateUserUseCase;
    this.registerUserUseCase = registerUserUseCase;
    this.logoutUserUseCase = logoutUserUseCase;
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
    await this.logoutUserUseCase.execute();
  }

  isAuthenticated(): boolean {
    const token = document.cookie
      .split(";")
      .find((c) => c.trim().startsWith("authToken="))
      ?.split("=")[1];
    return !!token;
  }
}
