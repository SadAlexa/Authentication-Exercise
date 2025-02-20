import { ApiProperty } from '@nestjs/swagger';
import {
    IsDate,
    IsEmail,
    IsNotEmpty,
    IsString,
    IsStrongPassword
} from 'class-validator';

export class CreateUserDto {
    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    id: string;

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    name: string;

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    surname: string;

    @ApiProperty()
    @IsDate()
    @IsNotEmpty()
    birthdate: Date;

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    image: string;

    @ApiProperty()
    @IsEmail()
    @IsNotEmpty()
    email: string;

    @ApiProperty()
    @IsStrongPassword()
    @IsNotEmpty()
    password: string;
}
