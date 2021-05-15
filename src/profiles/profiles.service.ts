import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { UpdateProfileDao } from './dto/update-profile.dto';
import { Profile } from './profile.entity';

@Injectable()
export class ProfilesService {
  constructor(
    @InjectRepository(Profile)
    private readonly profilesRepository: Repository<Profile>,
  ) {}

  async update(
    id: string,
    updateProfileDao: UpdateProfileDao,
  ): Promise<Profile> {
    await this.profilesRepository.update(id, { ...updateProfileDao });
    return await this.profilesRepository.findOne(id, { relations: ['user'] });
  }

  async findAll(): Promise<Profile[]> {
    return this.profilesRepository.find({ relations: ['user'] });
  }

  findOne(id: string): Promise<Profile> {
    return this.profilesRepository.findOne(id, { relations: ['user'] });
  }
}
