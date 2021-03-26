import { Entity, Column, OneToOne, PrimaryColumn, JoinColumn } from 'typeorm';
import { MetaEntity } from '../utils/meta.entity';
import { User } from '../users/user.entity';
import { Expose } from 'class-transformer';

@Entity()
export class Profile extends MetaEntity {
  @OneToOne(() => User, (user) => user.profile, {
    primary: true,
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'user' })
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
