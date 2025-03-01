import { User } from "../entities/User";

export interface UserRepistory {
  authenticate(email: string, password: string): Promise<void>;
  register(user: User): Promise<void>;
  logout(): Promise<void>;
}
