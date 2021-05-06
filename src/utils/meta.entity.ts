import { CreateDateColumn, DeleteDateColumn, UpdateDateColumn } from 'typeorm';

export abstract class MetaEntity {
  @CreateDateColumn()
  createdDt: Date;

  @UpdateDateColumn()
  updatedDt: Date | null;

  @DeleteDateColumn()
  deletedDt: Date | null;
}
