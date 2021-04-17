import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Post,
  Req,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as jwt from 'jsonwebtoken';

import { JwtPayloadDto } from '../common/dto/jwt-payload.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginDto } from './dto/login.dto';
import { User } from './user.entity';
import { UsersService } from './users.service';

type LoginResponse = Omit<User & { token: string }, 'id'>;

@Controller('users')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private readonly configService: ConfigService,
  ) {}

  @Post()
  async create(@Body() createUserDto: CreateUserDto): Promise<User> {
    const user = await this.usersService.findOneByUid(createUserDto.uid);

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

    const jwtPayload: JwtPayloadDto = {
      id: user.id,
      uid: user.uid,
      nickname: user.nickname,
    };
    const token = jwt.sign(jwtPayload, this.configService.get('JWT_SECRET'), {
      expiresIn: '360d',
    });

    return { ...user, token };
  }

  @Get()
  findAll(@Req() req): Promise<User[]> {
    console.log('Here, U can use user like this', req.user);
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
