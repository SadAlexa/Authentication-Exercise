import { useState } from "react";
import { AuthService } from "../../infrastructure/services/AuthService";
import { UserRepistoryIml } from "../../infrastructure/repositories/UserRepositoryImpl";
import { AuthenticateUser } from "../use-case/AuthenticateUser";
import { RegisterUser } from "../use-case/RegisterUser";
import { LogOutUser } from "../use-case/LogOutUser";
import { GetUser } from "../use-case/GetUser";
import { User } from "../../domain/entities/User";

export const useAuth = () => {
  const userRepistory = new UserRepistoryIml();
  const authService = new AuthService(
    new AuthenticateUser(userRepistory),
    new RegisterUser(userRepistory),
    new LogOutUser(userRepistory),
    new GetUser(userRepistory)
  );

  const [error, setError] = useState(null);
  const [token, setToken] = useState<string | null>(null);

  const login = async (email: string, password: string): Promise<void> => {
    try {
      const response = await authService.login(email, password);
      setError(null);
      setToken(response.authToken);
    } catch (err: any) {
      setError(err.message);
    }
  };

  const fetchUserData = async (
    authToken: string
  ): Promise<User | undefined> => {
    try {
      return await authService.getUser(authToken);
    } catch (err: any) {
      setError(err.message);
      return undefined;
    }
  };

  const logout = async () => {
    try {
      await authService.logout();
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
    token,
    error,
    login,
    fetchUserData,
    logout,
    register,
    isAuthenticated,
  };
};
