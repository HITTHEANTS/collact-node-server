import { LoginPlatformEnum } from '../user.entity';
import { IsNotEmpty } from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty()
  nickname: string;
  @IsNotEmpty()
  loginPlatform: LoginPlatformEnum;
  @IsNotEmpty()
  static uid: string;
  @IsNotEmpty()
  token: string;
}
