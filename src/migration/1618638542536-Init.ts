import { MigrationInterface, QueryRunner } from 'typeorm';

export class Init1618638542536 implements MigrationInterface {
  name = 'Init1618638542536';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TYPE "user_login_platform_enum" AS ENUM('manual', 'apple')`,
    );
    await queryRunner.query(
      `CREATE TABLE "user" ("created_dt" TIMESTAMP NOT NULL DEFAULT now(), "updated_dt" TIMESTAMP NOT NULL DEFAULT now(), "deleted_dt" TIMESTAMP, "id" SERIAL NOT NULL, "nickname" character varying(15) NOT NULL, "is_superuser" boolean NOT NULL DEFAULT false, "is_staff" boolean NOT NULL DEFAULT false, "is_active" boolean NOT NULL DEFAULT true, "login_platform" "user_login_platform_enum" NOT NULL DEFAULT 'manual', "uid" character varying(300), "token" character varying(1500), "last_login_dt" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP, CONSTRAINT "UQ_490abb1ad11bed1a7366e0ebf9e" UNIQUE ("nickname", "deleted_dt"), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "profile" ("created_dt" TIMESTAMP NOT NULL DEFAULT now(), "updated_dt" TIMESTAMP NOT NULL DEFAULT now(), "deleted_dt" TIMESTAMP, "photo" character varying, "contact" character varying(50), "intro" character varying(50), "details" text, "email" character varying, "phone" character varying(15), "user_id" integer NOT NULL, CONSTRAINT "REL_d752442f45f258a8bdefeebb2f" UNIQUE ("user_id"), CONSTRAINT "PK_d752442f45f258a8bdefeebb2f2" PRIMARY KEY ("user_id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "profile" ADD CONSTRAINT "FK_d752442f45f258a8bdefeebb2f2" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "profile" DROP CONSTRAINT "FK_d752442f45f258a8bdefeebb2f2"`,
    );
    await queryRunner.query(`DROP TABLE "profile"`);
    await queryRunner.query(`DROP TABLE "user"`);
    await queryRunner.query(`DROP TYPE "user_login_platform_enum"`);
  }
}
