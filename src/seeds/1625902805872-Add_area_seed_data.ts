import { getRepository, MigrationInterface, QueryRunner } from 'typeorm';

import { ProjectArea } from '../projects/project-area.entity';
import { ProjectAreaSeed } from './scripts/project-area.seed';

export class AddAreaSeedData1625902805872 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await getRepository(ProjectArea, 'seeds').save(ProjectAreaSeed);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}
