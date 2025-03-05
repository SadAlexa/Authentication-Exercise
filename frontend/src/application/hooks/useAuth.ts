import { useState } from "react";
import { AuthService } from "../../infrastructure/services/AuthService";
import { UserRepistoryIml } from "../../infrastructure/repositories/UserRepositoryImpl";
import { AuthenticateUser } from "../use-case/AuthenticateUser";
import { RegisterUser } from "../use-case/RegisterUser";
import { LogOutUser } from "../use-case/LogOutUser";

export const useAuth = () => {
  const userRepistory = new UserRepistoryIml();
  const authService = new AuthService(
    new AuthenticateUser(userRepistory),
    new RegisterUser(userRepistory),
    new LogOutUser(userRepistory)
  );

  const [error, setError] = useState(null);

  const login = async (email: string, password: string): Promise<void> => {
    try {
      await authService.login(email, password);
      setError(null);
    } catch (err: any) {
      setError(err.message);
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
    error,
    login,
    logout,
    register,
    isAuthenticated,
  };
};
