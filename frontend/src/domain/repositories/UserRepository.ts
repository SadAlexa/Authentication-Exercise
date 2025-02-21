import { User } from "../entities/User"

export interface UserRepistory {
    authenticate(email: string, password: string): Promise<User>
    register(user: User): Promise<void>
}