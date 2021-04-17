import { Exclude, Expose } from 'class-transformer';
import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryColumn,
  RelationId,
} from 'typeorm';

import { User } from '../users/user.entity';
import { MetaEntity } from '../utils/meta.entity';

@Entity()
export class Profile extends MetaEntity {
  @Exclude()
  @OneToOne(() => User, (user) => user.profile, {
    onDelete: 'CASCADE',
    primary: true,
    eager: true,
  })
  @JoinColumn({ name: 'user_id' })
  user: User;

  @Column({ nullable: true })
  photo: string;

  @Column({ length: 50, nullable: true })
  contact: string;

  @Column({ length: 50, nullable: true })
  intro: string;

  @Column({ type: 'text', nullable: true })
  details: string;

  @Column({ nullable: true })
  email: string;

  @Column({ length: 15, nullable: true })
  phone: string;

  @Expose()
  get nickname(): string {
    return this.user.nickname;
  }
}
