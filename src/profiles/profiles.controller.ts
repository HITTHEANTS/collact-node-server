import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Get,
  Param,
  Patch,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiBody, ApiConsumes } from '@nestjs/swagger';

import { AwsService } from '../aws/aws.service';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { ProfilePatchBody, ProfileResponse } from './profile.swagger';
import { ProfilesService } from './profiles.service';

@UseInterceptors(ClassSerializerInterceptor)
@Controller('profiles')
export class ProfilesController {
  constructor(
    private readonly awsService: AwsService,
    private readonly profilesService: ProfilesService,
  ) {}

  @Patch(':id')
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    type: ProfilePatchBody,
  })
  @UseInterceptors(FileInterceptor('file'))
  async update(
    @Param('id') id: string,
    @Body() updateProfileDto: UpdateProfileDto,
    @UploadedFile() file: Express.Multer.File,
  ): Promise<ProfileResponse> {
    if (file) {
      const photo = await this.awsService.upload(file, 'profiles');
      return this.profilesService.update(id, { ...updateProfileDto, photo });
    }
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
