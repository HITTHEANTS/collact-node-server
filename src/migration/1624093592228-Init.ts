import {MigrationInterface, QueryRunner} from "typeorm";

export class Init1624093592228 implements MigrationInterface {
    name = 'Init1624093592228'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "project_area" ("created_dt" TIMESTAMP NOT NULL DEFAULT now(), "updated_dt" TIMESTAMP NOT NULL DEFAULT now(), "deleted_dt" TIMESTAMP, "id" SERIAL NOT NULL, "area" character varying(50) NOT NULL, "projects_id" integer, CONSTRAINT "PK_c8c8b08f31da596f597a4492e6c" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "project_photo" ("created_dt" TIMESTAMP NOT NULL DEFAULT now(), "updated_dt" TIMESTAMP NOT NULL DEFAULT now(), "deleted_dt" TIMESTAMP, "id" SERIAL NOT NULL, "photo" character varying(50), "project_id" integer, CONSTRAINT "PK_c24a04e26269103eb19427429cd" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "project" ("created_dt" TIMESTAMP NOT NULL DEFAULT now(), "updated_dt" TIMESTAMP NOT NULL DEFAULT now(), "deleted_dt" TIMESTAMP, "id" SERIAL NOT NULL, "title" character varying(100) NOT NULL, "detail" text, CONSTRAINT "PK_4d68b1358bb5b766d3e78f32f57" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "user_login_platform_enum" AS ENUM('manual', 'apple')`);
        await queryRunner.query(`CREATE TABLE "user" ("created_dt" TIMESTAMP NOT NULL DEFAULT now(), "updated_dt" TIMESTAMP NOT NULL DEFAULT now(), "deleted_dt" TIMESTAMP, "id" SERIAL NOT NULL, "nickname" character varying(15) NOT NULL, "is_superuser" boolean NOT NULL DEFAULT false, "is_staff" boolean NOT NULL DEFAULT false, "is_active" boolean NOT NULL DEFAULT true, "login_platform" "user_login_platform_enum" NOT NULL DEFAULT 'manual', "uid" character varying(300), "token" character varying(1500), "last_login_dt" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP, CONSTRAINT "UQ_490abb1ad11bed1a7366e0ebf9e" UNIQUE ("nickname", "deleted_dt"), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "profile" ("created_dt" TIMESTAMP NOT NULL DEFAULT now(), "updated_dt" TIMESTAMP NOT NULL DEFAULT now(), "deleted_dt" TIMESTAMP, "photo" character varying, "contact" character varying(50), "intro" character varying(50), "detail" text, "email" character varying, "phone" character varying(15), "user_id" integer NOT NULL, CONSTRAINT "REL_d752442f45f258a8bdefeebb2f" UNIQUE ("user_id"), CONSTRAINT "PK_d752442f45f258a8bdefeebb2f2" PRIMARY KEY ("user_id"))`);
        await queryRunner.query(`CREATE TABLE "project_areas_project_area" ("project_id" integer NOT NULL, "project_area_id" integer NOT NULL, CONSTRAINT "PK_236e7ab32b7019e3169731ac690" PRIMARY KEY ("project_id", "project_area_id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_472fbfc540756792b984392620" ON "project_areas_project_area" ("project_id") `);
        await queryRunner.query(`CREATE INDEX "IDX_dbeb8c509fcece5657fb6352cc" ON "project_areas_project_area" ("project_area_id") `);
        await queryRunner.query(`CREATE TABLE "profile_projects_project" ("profile_user_id" integer NOT NULL, "project_id" integer NOT NULL, CONSTRAINT "PK_2f90ab7e2427b39e884953b84e7" PRIMARY KEY ("profile_user_id", "project_id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_5d8909ec2812dac1c78b2193da" ON "profile_projects_project" ("profile_user_id") `);
        await queryRunner.query(`CREATE INDEX "IDX_ce99941f5ddc6022d4bf661f9a" ON "profile_projects_project" ("project_id") `);
        await queryRunner.query(`ALTER TABLE "project_area" ADD CONSTRAINT "FK_9e96b5f198925028273a7c6427d" FOREIGN KEY ("projects_id") REFERENCES "project"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "project_photo" ADD CONSTRAINT "FK_68ece99b8799c2a87f60ad3dc1c" FOREIGN KEY ("project_id") REFERENCES "project"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "profile" ADD CONSTRAINT "FK_d752442f45f258a8bdefeebb2f2" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "project_areas_project_area" ADD CONSTRAINT "FK_472fbfc540756792b9843926200" FOREIGN KEY ("project_id") REFERENCES "project"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "project_areas_project_area" ADD CONSTRAINT "FK_dbeb8c509fcece5657fb6352cca" FOREIGN KEY ("project_area_id") REFERENCES "project_area"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "profile_projects_project" ADD CONSTRAINT "FK_5d8909ec2812dac1c78b2193dac" FOREIGN KEY ("profile_user_id") REFERENCES "profile"("user_id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "profile_projects_project" ADD CONSTRAINT "FK_ce99941f5ddc6022d4bf661f9a5" FOREIGN KEY ("project_id") REFERENCES "project"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "profile_projects_project" DROP CONSTRAINT "FK_ce99941f5ddc6022d4bf661f9a5"`);
        await queryRunner.query(`ALTER TABLE "profile_projects_project" DROP CONSTRAINT "FK_5d8909ec2812dac1c78b2193dac"`);
        await queryRunner.query(`ALTER TABLE "project_areas_project_area" DROP CONSTRAINT "FK_dbeb8c509fcece5657fb6352cca"`);
        await queryRunner.query(`ALTER TABLE "project_areas_project_area" DROP CONSTRAINT "FK_472fbfc540756792b9843926200"`);
        await queryRunner.query(`ALTER TABLE "profile" DROP CONSTRAINT "FK_d752442f45f258a8bdefeebb2f2"`);
        await queryRunner.query(`ALTER TABLE "project_photo" DROP CONSTRAINT "FK_68ece99b8799c2a87f60ad3dc1c"`);
        await queryRunner.query(`ALTER TABLE "project_area" DROP CONSTRAINT "FK_9e96b5f198925028273a7c6427d"`);
        await queryRunner.query(`DROP INDEX "IDX_ce99941f5ddc6022d4bf661f9a"`);
        await queryRunner.query(`DROP INDEX "IDX_5d8909ec2812dac1c78b2193da"`);
        await queryRunner.query(`DROP TABLE "profile_projects_project"`);
        await queryRunner.query(`DROP INDEX "IDX_dbeb8c509fcece5657fb6352cc"`);
        await queryRunner.query(`DROP INDEX "IDX_472fbfc540756792b984392620"`);
        await queryRunner.query(`DROP TABLE "project_areas_project_area"`);
        await queryRunner.query(`DROP TABLE "profile"`);
        await queryRunner.query(`DROP TABLE "user"`);
        await queryRunner.query(`DROP TYPE "user_login_platform_enum"`);
        await queryRunner.query(`DROP TABLE "project"`);
        await queryRunner.query(`DROP TABLE "project_photo"`);
        await queryRunner.query(`DROP TABLE "project_area"`);
    }

}
