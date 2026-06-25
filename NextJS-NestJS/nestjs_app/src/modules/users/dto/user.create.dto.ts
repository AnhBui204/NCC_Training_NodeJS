import { IsString, IsNumber, Length } from "class-validator"

export default class CreateUserDto{
    @IsString()
    @Length(1, 255, {message: "Email must be more than 1 and less than 255 chars"})
    email:string

    @IsString()
    @Length(1, 255, {message: "Email must be more than 1 and less than 255 chars"})
    password:string

    @IsString()
    @Length(1, 255, {message: "Name must be more than 1 and less than 255 chars"})
    name: string

    @IsNumber()
    age: number

    @IsString()
    gender: string

}

