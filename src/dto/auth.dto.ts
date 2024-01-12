import { IsNotEmpty, IsEmail, IsString } from 'class-validator'
export class UserDetailDto {
    @IsEmail()
    email: string

    @IsNotEmpty()
    @IsString()
    password: string
}