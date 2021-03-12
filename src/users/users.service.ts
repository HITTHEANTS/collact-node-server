import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
  ) {}

  // Signup
  create(createUserDto: CreateUserDto): Promise<User> {
    // TODO: (validation) validate firebase uid using token
    const isValid = true;

    if (!isValid) {
      const errors = { uid: 'uid is not valid.' };
      throw new HttpException(
        { message: 'input data validation failed.', errors },
        HttpStatus.BAD_REQUEST,
      );
    }

    const user = new User();
    user.nickname = createUserDto.nickname;
    user.loginPlatform = createUserDto.loginPlatform;
    user.uid = createUserDto.uid;
    user.token = createUserDto.token;
    return this.usersRepository.save(user);
  }

  async findAll(): Promise<User[]> {
    return this.usersRepository.find();
  }

  findOne(id: string): Promise<User> {
    return this.usersRepository.findOne(id);
  }

  async remove(id: string): Promise<void> {
    await this.usersRepository.delete(id);
  }
}
