import { useState } from "react";
import { AuthService } from "../../infrastructure/services/AuthService";
import { UserRepistoryIml } from "../../infrastructure/repositories/UserRepositoryImpl";
import { AuthenticateUser } from "../use-case/AuthenticateUser";
import { RegisterUser } from "../use-case/RegisterUser";
import { User } from "../../domain/entities/User";

export const useAuth = () => {
  const userRepistory = new UserRepistoryIml();
  const authService = new AuthService(
    new AuthenticateUser(userRepistory),
    new RegisterUser(userRepistory)
  );

  const [user, setUser] = useState<User | null>(null);
  const [error, setError] = useState(null);
  const [accessToken, setAccessToken] = useState<string>();

  const login = async (email: string, password: string): Promise<void> => {
    try {
      const response = await authService.login(email, password);
      setUser(response.user);
      setAccessToken(response.accessToken);
      setError(null);
    } catch (err: any) {
      setError(err.message);
    }
  };

  const logout = async () => {
    try {
      await authService.logout();
      setUser(null);
      setAccessToken("");
      setError(null);
    } catch (err: any) {
      setError(err.message);
    }
  };

  const register = async (
    name: string,
    surname: string,
    email: string,
    password: string
  ): Promise<boolean> => {
    try {
      await authService.register(name, surname, email, password);
      return true;
    } catch (err: any) {
      setError(err.message);
      return false;
    }
  };

  const isAuthenticated = () => {
    return authService.isAuthenticated();
  };

  return {
    user,
    error,
    accessToken,
    login,
    logout,
    register,
    isAuthenticated,
  };
};
