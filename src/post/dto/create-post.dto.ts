import { IsNotEmpty, MaxLength } from "class-validator";

export class CreatePostDto {
    @IsNotEmpty()
    @MaxLength(100)
    title: string;

    @IsNotEmpty()
    @MaxLength(100)
    content:string;

    @MaxLength(100)
    comment:string;


    

}
