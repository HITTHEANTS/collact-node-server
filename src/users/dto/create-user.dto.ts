import { IsNotEmpty } from 'class-validator';

import { LoginPlatformEnum } from '../user.entity';

export class CreateUserDto {
  @IsNotEmpty()
  nickname: string;
  @IsNotEmpty()
  loginPlatform: LoginPlatformEnum;
  @IsNotEmpty()
  uid: string;
  @IsNotEmpty()
  token: string;
}
