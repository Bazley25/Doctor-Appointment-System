import { IsNotEmpty ,IsEnum, MaxLength, MinLength , IsEmail} from "class-validator";
import { UserRoles } from "./UserRoles";
import { STATUS } from "src/dto/StatusTypes";

export class CreateUserDto{
    @IsNotEmpty()
    @MinLength(3)
    @MaxLength(20)
    name:string;
    
    @IsNotEmpty()
    @IsEmail()
    @MaxLength(20)
    email:string;
    
    @IsNotEmpty()
    @MinLength(6)
    @MaxLength(20)
    password:string;
    
    @IsNotEmpty()
    @IsEnum(UserRoles)
    role:UserRoles;
    
    @IsNotEmpty()
    @IsEnum(STATUS)
    status:STATUS;
}