import { Body, Injectable ,NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "./entities/user.entity";
import { Repository } from "typeorm";
import { CreateUserDto } from "./dto/CreateUser.dto";
import { encodePassword } from "src/utils/bcrypts";
import { UpdateUserDto } from "./dto/UpdateUser.dto";

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>
  ) {}

  async findAll(): Promise<User[]> {
    const users = await this.userRepository.find();
    return users;
  }

  async findOne(id: number): Promise<User> {
    const user = await this.userRepository.findOneBy({ id });
    if (!user) {
      throw new NotFoundException(`User ${id} not found`);
    }
    return user;
  }

  async findByEmail(email: string): Promise<User> {
    return await this.userRepository.findOneBy({ email });
  }

  async create(createUserDto: CreateUserDto) {
    const password = encodePassword(createUserDto.password);
    const imgUrl = `https://robohash.org/${new Date().getTime()}.png`;
    const create_at = new Date().toISOString().slice(0, 19).replace("T", " ");
    const update_at = new Date().toISOString().slice(0, 19).replace("T", " ");

    const user = await this.userRepository.create({
      ...createUserDto,
      password,
      imgUrl,
      create_at,
      update_at,
    });

    return await this.userRepository.save(user);
  }

  async update(id: number, @Body() updateUserDto: UpdateUserDto) {
    const user = await this.findOne(id);
    if (!user) {
      throw new NotFoundException(`User not found`);
    }
    Object.assign(user, updateUserDto);
    return this.userRepository.save(user);
  }

  async remove(id: number) {
    const user = await this.findOne(id);
    if (!user) {
      throw new NotFoundException(`User not found`);
    }

    return this.userRepository.remove(user);
  }
}
