import { ApiProperty, OmitType, PartialType } from '@nestjs/swagger';

import { UpdateProfileDto } from './dto/update-profile.dto';
import { Profile } from './profile.entity';

export class ProfileResponse extends OmitType(Profile, ['user'] as const) {}

export class ProfilePatchBody extends PartialType(UpdateProfileDto) {
  @ApiProperty({ type: 'string', format: 'binary', required: false })
  file: any | null;
}
