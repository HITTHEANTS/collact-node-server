import { LoginPlatformEnum } from '../user.entity';
import { IsNotEmpty } from 'class-validator';

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
