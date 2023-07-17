import { STATUS } from "src/dto/StatusTypes";
import { UserRoles } from "./UserRoles";
import { Expose } from "class-transformer";

export class UserDto{
    @Expose()
    id:number;
    
    @Expose()
    name:string;
    
    @Expose()
    email:string;
    
    @Expose()
    imgUrl:string;
    
    @Expose()
    role:UserRoles;
    
    @Expose()
    status:STATUS;
}