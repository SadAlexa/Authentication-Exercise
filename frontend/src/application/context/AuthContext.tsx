import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { AuthService } from "../../infrastructure/services/AuthService";
import { UserRepistoryIml } from "../../infrastructure/repositories/UserRepositoryImpl";
import { AuthenticateUser } from "../use-case/AuthenticateUser";
import { RegisterUser } from "../use-case/RegisterUser";
import { LogOutUser } from "../use-case/LogOutUser";
import { GetUser } from "../use-case/GetUser";
import { User } from "../../domain/entities/User";

// const AuthContext = createContext({
//   login: (_email: string, _password: string) => {},
//   register: (
//     _name: string,
//     _surname: string,
//     _email: string,
//     _password: string
//   ) => {
//   },
//   logout: () => {
//   },
//   userData: {
//   } as User,
//   isLoggedIn: false,
//   token: "",
//   error: null,
//   loading: false,
// });

type LoginType = (email: string, password: string) => void;
type RegisterType = (
  name: string,
  surname: string,
  email: string,
  password: string
) => void;

type LogoutType = () => void;

type AuthContextType = {
  login: LoginType;
  register: RegisterType;
  logout: LogoutType;
  userData: User;
  isLoggedIn: boolean;
  token: string;
  error: any;
  loading: boolean;
};

const AuthContext = createContext<AuthContextType>({
  login: () => {},
  register: () => {},
  logout: () => {},
  userData: {} as User,
  isLoggedIn: false,
  token: "",
  error: null,
  loading: false,
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const userRepistory = useMemo(() => new UserRepistoryIml(), []);
  const authService = useMemo(() => {
    return new AuthService(
      new AuthenticateUser(userRepistory),
      new RegisterUser(userRepistory),
      new LogOutUser(userRepistory),
      new GetUser(userRepistory)
    );
  }, [userRepistory]);

  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [token, setToken] = useState<string>("");
  const [userData, setUserData] = useState<User>({
    token: "",
    name: "",
    surname: "",
    email: "",
    password: "",
  });

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

  useEffect(() => {
    authService.isAuthenticated().then((result) => {
      setIsLoggedIn(!!result);
      setToken(result || "");
    });
  }, [authService]);

  useEffect(() => {
    const getUserData = async () => {
      if (token.length === 0) {
        return;
      }
      const data = await authService.getUser(token);
      setUserData(data!);
    };
    getUserData();
  }, [token, authService]);

  return (
    <AuthContext.Provider
      value={{
        login,
        logout,
        register,
        isLoggedIn,
        token,
        userData,
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
