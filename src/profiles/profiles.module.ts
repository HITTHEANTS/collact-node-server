import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AwsService } from '../aws/aws.service';
import { Profile } from './profile.entity';
import { ProfilesController } from './profiles.controller';
import { ProfilesService } from './profiles.service';

@Module({
  imports: [TypeOrmModule.forFeature([Profile])],
  providers: [ProfilesService, ConfigService, AwsService],
  controllers: [ProfilesController],
})
export class ProfilesModule {}
