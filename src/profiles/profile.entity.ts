import { ApiProperty } from '@nestjs/swagger';
import { Exclude, Expose } from 'class-transformer';
import {
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  OneToOne,
} from 'typeorm';

import { Project } from '../projects/project.entity';
import { User } from '../users/user.entity';
import { MetaEntity } from '../utils/meta.entity';

@Entity()
export class Profile extends MetaEntity {
  @Exclude()
  @OneToOne(() => User, (user) => user.profile, {
    onDelete: 'CASCADE',
    primary: true,
  })
  @JoinColumn({ name: 'user_id' })
  user: User;

  @Column({ nullable: true })
  photo: string | null;

  @Column({ length: 50, nullable: true })
  contact: string | null;

  @Column({ length: 50, nullable: true })
  intro: string | null;

  @Column({ type: 'text', nullable: true })
  detail: string | null;

  @Column({ nullable: true })
  email: string | null;

  @Column({ length: 15, nullable: true })
  phone: string | null;

  @ManyToMany((type) => Project, (project) => project.collaborators, {
    onDelete: 'DEFAULT',
  })
  @JoinTable()
  projects: Project[];

  @ApiProperty({ type: String })
  @Expose()
  get nickname(): string {
    return this.user.nickname;
  }
}
