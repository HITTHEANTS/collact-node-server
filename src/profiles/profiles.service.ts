import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Profile } from './profile.entity';
import { UpdateProfileDto } from './dto/update-profile.dto';

@Injectable()
export class ProfilesService {
  constructor(
    @InjectRepository(Profile)
    private readonly profilesRepository: Repository<Profile>,
  ) {}

  async update(
    id: string,
    updateProfileDto: UpdateProfileDto,
  ): Promise<Profile> {
    const before = await this.profilesRepository.findOne(id);
    const after = Object.assign(before, updateProfileDto);
    return await this.profilesRepository.save(after);
  }

  async findAll(): Promise<Profile[]> {
    return this.profilesRepository.find();
  }

  findOne(id: string): Promise<Profile> {
    return this.profilesRepository.findOne(id);
  }
}
