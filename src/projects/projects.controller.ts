import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Req,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import { ApiBody, ApiConsumes, ApiResponse } from '@nestjs/swagger';

import { AwsService } from '../aws/aws.service';
import { CreateProjectDto } from './dto/create-project.dto';
import { Project } from './project.entity';
import { ProjectsService } from './projects.service';
import { ProjectPostBody, ProjectsAreaGetResponse } from './projects.swagger';

@Controller('projects')
export class ProjectsController {
  constructor(
    private readonly awsService: AwsService,
    private readonly projectsService: ProjectsService,
  ) {}

  @Get('areas')
  @ApiResponse({
    status: 200,
    type: ProjectsAreaGetResponse,
    isArray: true,
  })
  getAllAreas() {
    return this.projectsService.findAllAreas();
  }

  @Post()
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    type: ProjectPostBody,
  })
  @UseInterceptors(FilesInterceptor('photos'))
  async create(
    @Req() req,
    @Body() createProjectDto: CreateProjectDto,
    @UploadedFiles() photos: Express.Multer.File[], // TODO: 여러 사진 파일 받을 수 있도록
  ): Promise<Project> {
    if (photos) {
      const photoPath = await this.awsService.uploadMultipleFiles(
        photos,
        'profiles',
      );
      return this.projectsService.create({
        ...createProjectDto,
        photos: photoPath,
        collaborators: `${req.user.id},${createProjectDto.collaborators}`,
      });
    }
    return this.projectsService.create(createProjectDto);
  }

  @Get()
  findAll(): Promise<Project[]> {
    return this.projectsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<Project> {
    return this.projectsService.findOne(id);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<void> {
    return this.projectsService.remove(id);
  }
}
