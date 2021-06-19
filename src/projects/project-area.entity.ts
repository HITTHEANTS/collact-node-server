import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

import { MetaEntity } from '../utils/meta.entity';
import { Project } from './project.entity';

@Entity()
export class ProjectArea extends MetaEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 50 })
  area: string;

  @ManyToOne((type) => Project, (project) => project.areas, {
    onDelete: 'CASCADE',
  })
  projects: Project;
}
