import { OmitType } from '@nestjs/swagger';

import { Profile } from './profile.entity';

export class ProfileResponse extends OmitType(Profile, ['user'] as const) {}
