import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Post,
} from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import * as jwt from 'jsonwebtoken';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './user.entity';
import { UsersService } from './users.service';
import { LoginDto } from './dto/login.dto';

type LoginResponse = Omit<User & { token: string }, 'id'>;

@Controller('users')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private readonly configService: ConfigService,
  ) {}

  @Post()
  async create(@Body() createUserDto: CreateUserDto): Promise<User> {
    const user = await this.usersService.findOneByUid(CreateUserDto.uid);

    if (user) {
      const errors = { uid: 'uid is already signed-up.' };
      throw new HttpException(
        { message: 'input data validation failed.', errors },
        HttpStatus.BAD_REQUEST,
      );
    }

    return this.usersService.create(createUserDto);
  }

  @Post('login')
  async login(@Body() loginDto: LoginDto): Promise<LoginResponse> {
    const user = await this.usersService.findOneByUid(loginDto.uid);

    // TODO: (validation) validate firebase uid using token
    const isValid = true;

    if (!isValid) {
      const errors = { uid: 'uid is not valid.' };
      throw new HttpException(
        { message: 'input data validation failed.', errors },
        HttpStatus.BAD_REQUEST,
      );
    }

    if (user === undefined) {
      const errors = { uid: 'There is no user who has this uid' };
      throw new HttpException(
        { message: 'Uid does not Exist.', errors },
        HttpStatus.BAD_REQUEST,
      );
    }

    const token = jwt.sign({ ...user }, this.configService.get('JWT_SECRET'), {
      expiresIn: '24h',
    });

    return { ...user, token };
  }

  @Get()
  findAll(): Promise<User[]> {
    return this.usersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<User> {
    return this.usersService.findOne(id);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<void> {
    return this.usersService.remove(id);
  }
}
