import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { Profile } from '../profiles/profile.entity';
import { MetaEntity } from '../utils/meta.entity';
import { ProjectArea } from './project-area.entity';
import { ProjectPhoto } from './project-photo.entity';

@Entity()
export class Project extends MetaEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToMany((type) => ProjectPhoto, (photo) => photo.project, {
    onDelete: 'CASCADE',
  })
  photos: ProjectPhoto[];

  @ManyToMany((type) => Profile, (profile) => profile.projects, {
    onDelete: 'DEFAULT',
  })
  collaborators: Profile[];

  @ManyToMany((type) => ProjectArea, (area) => area.projects, {
    onDelete: 'DEFAULT',
  })
  @JoinTable()
  areas: ProjectArea[];

  @Column({ length: 100 })
  title: string;

  @Column({ type: 'text', nullable: true })
  detail: string | null;
}
