import { Entity, PrimaryGeneratedColumn, Column, OneToOne } from 'typeorm';
import { MetaEntity } from '../utils/meta.entity';
import { User } from '../users/user.entity';

@Entity()
export class Profile extends MetaEntity {
  @PrimaryGeneratedColumn()
  id: number;

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

  @OneToOne(() => User, (user) => user.profile)
  user: User;
}
