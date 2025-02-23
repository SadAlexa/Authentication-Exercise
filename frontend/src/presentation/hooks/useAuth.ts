import { useState } from "react";
import { UserRepistoryIml } from "../../infrastructure/repositories/UserRepositoryImpl";
import { User } from "../../domain/entities/User";
import { AuthService } from "../../domain/services/AuthService";
import { AuthenticateUser } from "../../application/use-case/AuthenticateUser";
import { RegisterUser } from "../../application/use-case/RegisterUser";

const userRepistory = new UserRepistoryIml();
const authService = new AuthService(
  new AuthenticateUser(userRepistory),
  new RegisterUser(userRepistory)
);

export const useAuth = () => {
  const [user, setUser] = useState<User | null>(null);

  const login = async (
    username: string,
    password: string
  ): Promise<boolean> => {
    try {
      const loggedInUser = await authService.login(username, password);
      setUser(loggedInUser);
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
    setUser(null);
  };

  const isAuthenticated = () => {
    return authService.isAuthenticated();
  };

  return { user, login, register, logout, isAuthenticated };
};
