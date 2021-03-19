import { IsNotEmpty } from 'class-validator';

export class LoginDto {
  @IsNotEmpty()
  uid: string;
  @IsNotEmpty()
  token: string;
}
