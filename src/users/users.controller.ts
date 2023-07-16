import {
  Body,
  Controller,
  Post,
  Get,
  Patch,
  Query,
  Param,
  BadRequestException,
  Delete,
  NotFoundException,
  UseInterceptors,
  ClassSerializerInterceptor
} from "@nestjs/common";
import { UsersService } from "./users.service";
import { CreateUserDto } from "./dto/CreateUser.dto";
import { UpdateUserDto } from "./dto/UpdateUser.dto";

@Controller("users")
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get()
  async getUsers() {
    return await this.usersService.findAll();
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @Get("/:id")
  async getUser(@Param("id") id: string) {
    const user= await this.usersService.findOne(parseInt(id));
    if(!user){
        throw new NotFoundException("User not found");
    }
    return user;
  }

  @Post("create")
  async createUser(@Body() createUserDto: CreateUserDto) {
    const userExists = await this.usersService.findByEmail(createUserDto.email);

    if (userExists) {
      throw new BadRequestException(["Email is already taken!"]);
    }

    const user = await this.usersService.create(createUserDto);
    delete user.password;
    return user;
  }
  
  @Patch('/:id')
  async updateUser(@Param('id') id:string, @Body() updateUserDto: UpdateUserDto){
    return this.usersService.update(parseInt(id), updateUserDto);
  }

  @Delete("/:id")
  async deleteUser(@Param("id") id: string) {
    return this.usersService.remove(parseInt(id));
  }
}
