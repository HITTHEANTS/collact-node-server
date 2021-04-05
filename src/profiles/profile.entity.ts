import { Expose } from 'class-transformer';
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
  @OneToOne(() => User, (user) => user.profile, {
    onDelete: 'CASCADE',
  })
  @JoinColumn()
  user: User;

  @PrimaryColumn()
  @RelationId((profile: Profile) => profile.user)
  userId: number;

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
    //TODO(jayden)
    return 'this.user.nickname';
  }
}
