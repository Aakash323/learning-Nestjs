import { IsEmail, IsNotEmpty } from "class-validator";

export class CreateLoginDto {
    
    @IsEmail()
    @IsNotEmpty()
    email:string;


    @IsNotEmpty()
    password:string;
}
