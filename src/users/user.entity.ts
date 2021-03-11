import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
  Unique,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class User {
  // TODO: set unique columns (nickname&deletedDate, uid, token), implement profile entity

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nickname: string;

  @Column({ default: false })
  isSuperuser: boolean;

  @Column({ default: false })
  isStaff: boolean;

  @Column({ default: true })
  isActive: boolean;

  @Column({ default: 'manual' })
  loginBy: string;

  @Column({ nullable: true })
  uid: string;

  @Column({ nullable: true })
  token: string;

  // @OneToOne(type => Profile, profile => profile.user)
  // @JoinColumn()
  // profile: Profile;

  @Column({ default: () => 'CURRENT_TIMESTAMP' })
  lastLoginDt: Date;

  @CreateDateColumn()
  createdDate: Date;

  @UpdateDateColumn()
  updatedDate: Date;

  @DeleteDateColumn()
  deletedDate: Date;
}
