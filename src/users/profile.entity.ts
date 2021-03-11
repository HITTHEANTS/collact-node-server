import { Entity, PrimaryGeneratedColumn, Column, OneToOne } from 'typeorm';
import { User } from './user.entity';
import { MetaEntity } from '../utils/meta.entity';
import { IsEmail, IsFQDN } from 'class-validator';

@Entity()
export class Profile extends MetaEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  @IsFQDN()
  photo: string; // TODO: (validation) IsFQDN으로 부족함. collact S3 인지 확인 필요

  @Column({ length: 50, nullable: true })
  contact: string;

  @Column({ length: 50, nullable: true })
  intro: string;

  @Column({ type: 'text', nullable: true })
  details: string;

  @Column({ nullable: true })
  @IsEmail()
  email: string;

  @Column({ length: 15, nullable: true })
  phone: string;

  @OneToOne(() => User, (user) => user.profile)
  user: User;
}
