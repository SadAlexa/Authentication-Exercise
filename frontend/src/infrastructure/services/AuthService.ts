import { AuthenticateUser } from "../../application/use-case/AuthenticateUser";
import { GetUser } from "../../application/use-case/GetUser";
import { LogOutUser } from "../../application/use-case/LogOutUser";
import { RegisterUser } from "../../application/use-case/RegisterUser";
import { User } from "../../domain/entities/User";

export class AuthService {
  private authenticateUserUseCase: AuthenticateUser;
  private registerUserUseCase: RegisterUser;
  private logoutUserUseCase: LogOutUser;
  private getUserUseCase: GetUser;

  constructor(
    authenticateUserUseCase: AuthenticateUser,
    registerUserUseCase: RegisterUser,
    logoutUserUseCase: LogOutUser,
    getUserUseCase: GetUser
  ) {
    this.authenticateUserUseCase = authenticateUserUseCase;
    this.registerUserUseCase = registerUserUseCase;
    this.logoutUserUseCase = logoutUserUseCase;
    this.getUserUseCase = getUserUseCase;
  }

  async login(
    email: string,
    password: string
  ): Promise<{
    authToken: string;
  }> {
    return await this.authenticateUserUseCase.execute(email, password);
  }

  async getUser(authToken: string): Promise<User | undefined> {
    return await this.getUserUseCase.execute(authToken);
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
