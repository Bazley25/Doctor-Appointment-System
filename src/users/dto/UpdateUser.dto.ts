
import { PartialType } from "@nestjs/swagger";
import { CreateUserDto } from "./CreateUser.dto";
import { IsInt } from "class-validator";
export class UpdateUserDto extends PartialType(CreateUserDto){
    @IsInt()
    id:number;
}