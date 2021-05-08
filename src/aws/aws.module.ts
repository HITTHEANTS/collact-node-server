import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { AwsService } from './aws.service';

@Module({
  imports: [ConfigModule],
  providers: [AwsService],
})
export class AwsModule {}
