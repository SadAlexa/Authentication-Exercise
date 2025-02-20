import { Inject, Injectable } from "@nestjs/common";
import { UserRepository } from "../ports/user.reporitory";


interface GetUserCommand {
    email: string;
    password: string;
}
@Injectable()
export class GetUserUseCase {
    constructor(@Inject(UserRepository) private readonly userRepository: UserRepository) {}

    async execute({email, password}: GetUserCommand): Promise<any> {
        const response = await this.userRepository.findByEmailAndPassword(email, password);
        return response; 
    }
}