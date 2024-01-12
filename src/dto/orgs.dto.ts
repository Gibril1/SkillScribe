import { IsNotEmpty, IsNumber, IsString } from "class-validator"

export class CreateOrgsDto{
    @IsString()
    @IsNotEmpty()
    name: string

    @IsString()
    @IsNotEmpty()
    location: string

    @IsNotEmpty()
    @IsNumber()
    startYear: number
    endYear: number

    @IsString()
    @IsNotEmpty()
    role: string
}