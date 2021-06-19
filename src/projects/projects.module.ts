import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AwsService } from '../aws/aws.service';
import { Profile } from '../profiles/profile.entity';
import { Project } from './project.entity';
import { ProjectArea } from './project-area.entity';
import { ProjectPhoto } from './project-photo.entity';
import { ProjectsController } from './projects.controller';
import { ProjectsService } from './projects.service';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forFeature([Profile, Project, ProjectPhoto, ProjectArea]),
  ],
  providers: [ProjectsService, AwsService],
  controllers: [ProjectsController],
})
export class ProjectsModule {}
