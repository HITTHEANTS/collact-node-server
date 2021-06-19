import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

import { MetaEntity } from '../utils/meta.entity';
import { Project } from './project.entity';

@Entity()
export class ProjectPhoto extends MetaEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  photo: string | null;

  @ManyToOne((type) => Project, (project) => project.photos, {
    onDelete: 'CASCADE',
  })
  project: Project;
}
