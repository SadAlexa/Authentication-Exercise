import { User } from "../entities/User";

export interface UserRepistory {
  authenticate(
    email: string,
    password: string
  ): Promise<{ accessToken: string; user: User }>;
  register(user: User): Promise<void>;
  logout(): Promise<void>;
}
