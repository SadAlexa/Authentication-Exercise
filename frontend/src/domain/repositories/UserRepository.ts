import { User } from "../entities/User";

export interface UserRepistory {
  authenticate(email: string, password: string): Promise<{ authToken: string }>;
  getUser(authToken: string): Promise<User | undefined>;
  register(user: User): Promise<void>;
  logout(): Promise<void>;
}
