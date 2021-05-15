import {
  Column,
  Entity,
  OneToOne,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm';

import { Profile } from '../profiles/profile.entity';
import { MetaEntity } from '../utils/meta.entity';

export enum LoginPlatformEnum {
  MANUAL = 'manual',
  APPLE = 'apple',
}

@Entity()
@Unique(['nickname', 'deletedDt'])
export class User extends MetaEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 15 })
  nickname: string;

  @Column({ default: false })
  isSuperuser: boolean;

  @Column({ default: false })
  isStaff: boolean;

  @Column({ default: true })
  isActive: boolean;

  @Column({
    type: 'enum',
    enum: LoginPlatformEnum,
    default: LoginPlatformEnum.MANUAL,
  })
  loginPlatform: string;

  @Column({ length: 300, nullable: true })
  uid: string;

  @Column({ length: 1500, nullable: true })
  token: string;

  @OneToOne(() => Profile, (profile) => profile.user, {
    cascade: ['insert'],
    onDelete: 'CASCADE',
  })
  profile: Profile;

  @Column({ default: () => 'CURRENT_TIMESTAMP' })
  lastLoginDt: Date;
}
