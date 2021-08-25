import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Req,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import { ApiBody, ApiConsumes, ApiOkResponse } from '@nestjs/swagger';

import { AwsService } from '../aws/aws.service';
import { ProfileResponse } from '../profiles/profile.swagger';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
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
  @ApiOkResponse({
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
    @UploadedFiles() photos: Express.Multer.File[],
  ): Promise<Project> {
    const collaborators = createProjectDto.collaborators
      ? `${createProjectDto.collaborators}`
      : '';

    if (photos) {
      const photoPath = await this.awsService.uploadMultipleFiles(
        photos,
        'profiles',
      );
      return this.projectsService.create({
        ...createProjectDto,
        photos: photoPath,
        collaborators: `${req.user.id},${collaborators}`,
      });
    }
    return this.projectsService.create(createProjectDto);
  }

  // @ApiBody({
  //   type: ProfilePatchBody,
  // })
  @Patch(':id')
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(FilesInterceptor('photos'))
  async update(
    @Param('id') id: string,
    @Body() updateProjectDto: UpdateProjectDto,
    @UploadedFiles() photos: Express.Multer.File[],
  ): Promise<ProfileResponse> {
    if (photos) {
      const paths = Promise.all(
        photos.map((photo) => this.awsService.uploadFile(photo, 'projects')),
      );

      return this.projectsService.update(id, {
        ...projectsService,
        photo: photoPath,
      });
    }
    return this.profilesService.update(id, updateProfileDto);
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
  async remove(@Param('id') id: string): Promise<void> {
    await this.projectsService.remove(id);
  }
}
