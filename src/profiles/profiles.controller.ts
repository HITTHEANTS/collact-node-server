import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Get,
  Param,
  Patch,
  UseInterceptors,
} from '@nestjs/common';

import { UpdateProfileDto } from './dto/update-profile.dto';
import { ProfileResponse } from './profile.swagger';
import { ProfilesService } from './profiles.service';

@UseInterceptors(ClassSerializerInterceptor)
@Controller('profiles')
export class ProfilesController {
  constructor(private readonly profilesService: ProfilesService) {}

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateProfileDto: UpdateProfileDto,
  ): Promise<ProfileResponse> {
    return this.profilesService.update(id, updateProfileDto);
  }

  @Get()
  findAll(): Promise<ProfileResponse[]> {
    return this.profilesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<ProfileResponse> {
    return this.profilesService.findOne(id);
  }
}
