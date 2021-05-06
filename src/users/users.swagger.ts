import { ApiProperty, OmitType } from '@nestjs/swagger';

import { Profile } from '../profiles/profile.entity';
import { User } from './user.entity';

export class UserResponse extends OmitType(User, ['profile'] as const) {}

class UserProfileResponse extends OmitType(Profile, ['nickname', 'user']) {}

export class LoginResponse extends UserResponse {
  @ApiProperty()
  authToken: string;

  @ApiProperty()
  profile: UserProfileResponse;
}
