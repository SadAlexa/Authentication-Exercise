import { Body, Controller, Get, Post} from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { CreateUserUseCase } from "src/application/use-case/create-user";
import { GetUserUseCase } from "src/application/use-case/get-user";
import { CreateUserDto } from "./dto/create.user.dto";

@Controller('/user')
@ApiTags('User')
export class UserController {
    constructor(
        private createUserUseCase: CreateUserUseCase,
        private getUserUseCase: GetUserUseCase
    ) {}

    @Get('')
    getUser( email: string, password: string) {
        return this.getUserUseCase.execute({email, password});
    }

    @Post('')
    createUser(@Body() createUserDto: CreateUserDto) {
        return this.createUserUseCase.execute(createUserDto);
    }

}