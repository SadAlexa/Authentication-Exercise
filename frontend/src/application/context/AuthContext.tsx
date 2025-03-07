import { createContext, useContext, useState } from "react";
import { AuthService } from "../../infrastructure/services/AuthService";
import { UserRepistoryIml } from "../../infrastructure/repositories/UserRepositoryImpl";
import { AuthenticateUser } from "../use-case/AuthenticateUser";
import { RegisterUser } from "../use-case/RegisterUser";
import { LogOutUser } from "../use-case/LogOutUser";
import { GetUser } from "../use-case/GetUser";
import { User } from "../../domain/entities/User";

const AuthContext = createContext({
  login: (_email: string, _password: string): Promise<void> => {
    return new Promise(() => {});
  },
  register: (
    _name: string,
    _surname: string,
    _email: string,
    _password: string
  ): Promise<boolean> => {
    return new Promise(() => {});
  },
  logout: (): Promise<void> => {
    return new Promise(() => {});
  },
  fetchUserData: (_authToken: string): Promise<User | undefined> => {
    return new Promise(() => {});
  },
  isAuthenticated: (): boolean => {
    return false;
  },
  token: "",
  error: null,
  loading: false,
});
export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const userRepistory = new UserRepistoryIml();
  const authService = new AuthService(
    new AuthenticateUser(userRepistory),
    new RegisterUser(userRepistory),
    new LogOutUser(userRepistory),
    new GetUser(userRepistory)
  );

  const [error, setError] = useState(null);
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const login = async (email: string, password: string): Promise<void> => {
    setLoading(true);
    try {
      const response = await authService.login(email, password);
      setError(null);
      setToken(response.authToken);
      setLoading(false);
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
    setError(null);
    setLoading(true);
    try {
      await authService.register(name, surname, email, password);
      setLoading(false);
      return true;
    } catch (err: any) {
      setError(err.message);
      return false;
    }
  };

  const isAuthenticated = () => {
    return authService.isAuthenticated();
  };

  return (
    <AuthContext.Provider
      value={{
        login,
        logout,
        register,
        isAuthenticated,
        fetchUserData,
        token: token ?? "",
        error,
        loading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
