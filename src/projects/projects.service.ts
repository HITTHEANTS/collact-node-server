import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Profile } from '../profiles/profile.entity';
import { parseMultipleIds } from '../utils/parser';
import {
  CreateProjectDao,
  CreateProjectDaoHelper,
} from './dto/create-project.dto';
import { UpdateProjectDaoHelper } from './dto/update-project.dto';
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
    const areas = parseMultipleIds(createProjectDaoHelper.areas);
    const collaborators = parseMultipleIds(
      createProjectDaoHelper.collaborators,
    );
    const photoPaths = createProjectDaoHelper.photos;

    const createProjectDao: CreateProjectDao = {
      ...createProjectDaoHelper,
      photos: [],
      areas: await this.projectAreasRepository.findByIds(areas),
      collaborators: await this.profilesRepository.findByIds(collaborators),
    };
    const project = await this.projectsRepository.save(createProjectDao);
    const rawPhotos = photoPaths.map((path) => ({
      photo: path,
      project,
    }));
    project.photos = (await this.projectPhotosRepository.save(rawPhotos)).map(
      (photo) => {
        delete photo.project;
        return photo;
      },
    );

    return project;
  }

  async update(updateProjectDaoHelper: UpdateProjectDaoHelper) {
    this.projectsRepository.save(updateProjectDaoHelper);
  }

  findAll(): Promise<Project[]> {
    return this.projectsRepository.find();
  }

  findOne(id: string): Promise<Project> {
    return this.projectsRepository.findOne(id);
  }

  findAllAreas(): Promise<Array<Omit<ProjectArea, 'projects'>>> {
    return this.projectAreasRepository.find();
  }

  remove(id: string) {
    return this.projectsRepository.delete(id);
  }
}
