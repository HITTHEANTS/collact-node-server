import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Profile } from '../profiles/profile.entity';
import {
  CreateProjectDao,
  CreateProjectDaoHelper,
} from './dto/create-project.dto';
import { Project } from './project.entity';
import { ProjectArea } from './project-area.entity';
import { ProjectPhoto } from './project-photo.entity';

@Injectable()
export class ProjectsService {
  constructor(
    @InjectRepository(Project)
    private readonly projectsRepository: Repository<Project>,
    @InjectRepository(Profile)
    private readonly profilesRepository: Repository<Profile>,
    @InjectRepository(ProjectArea)
    private readonly projectAreasRepository: Repository<ProjectArea>,
    @InjectRepository(ProjectPhoto)
    private readonly projectPhotosRepository: Repository<ProjectPhoto>,
  ) {}

  async create(
    createProjectDaoHelper: CreateProjectDaoHelper,
  ): Promise<Project> {
    const areas = createProjectDaoHelper.areas.split(',');
    const collaborators = createProjectDaoHelper.collaborators.split(',');
    const photoPaths = [createProjectDaoHelper.photos];

    const createProjectDao: CreateProjectDao = {
      ...createProjectDaoHelper,
      photos: [],
      areas: await this.projectAreasRepository.findByIds(areas),
      collaborators: await this.profilesRepository.findByIds(collaborators),
    };
    const project = await this.projectsRepository.save(createProjectDao);
    const rawPhotos = photoPaths.map((path) => ({ photo: path, project }));
    await this.projectPhotosRepository.save(rawPhotos);

    return project;
  }

  async findAll(): Promise<Project[]> {
    return this.projectsRepository.find();
  }

  findOne(id: string): Promise<Project> {
    return this.projectsRepository.findOne(id);
  }

  async remove(id: string): Promise<void> {
    await this.projectsRepository.delete(id);
  }
}
