import { useState } from "react";
import { UserRepistoryIml } from "../../infrastructure/repositories/UserRepositoryImpl";
import { AuthService } from "../../domain/services/AuthService";
import { AuthenticateUser } from "../../application/use-case/AuthenticateUser";
import { RegisterUser } from "../../application/use-case/RegisterUser";

const userRepistory = new UserRepistoryIml();
const authService = new AuthService(
  new AuthenticateUser(userRepistory),
  new RegisterUser(userRepistory)
);

export const useAuth = () => {
  const [token, setToken] = useState<{ accessToken: string } | null>(null);

  const login = async (
    username: string,
    password: string
  ): Promise<boolean> => {
    try {
      const loggedUser = await authService.login(username, password);
      setToken(loggedUser);
    } catch (error) {
      console.error("Login failed:", error);
      return false;
    }
    return true;
  };

  const register = async (
    name: string,
    surname: string,
    email: string /* dateOfBirth: Date, */,
    /* image: string, */ password: string
  ): Promise<boolean> => {
    try {
      await authService.register(name, surname, email, /* image, */ password);
    } catch (error) {
      console.error("Registration failed:", error);
      return false;
    }
    return true;
  };

  const logout = () => {
    authService.logout();
    setToken(null);
  };

  const isAuthenticated = () => {
    return authService.isAuthenticated();
  };

  return { token, login, register, logout, isAuthenticated };
};
