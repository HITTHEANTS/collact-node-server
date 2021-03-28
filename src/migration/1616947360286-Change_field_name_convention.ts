import {MigrationInterface, QueryRunner} from "typeorm";

export class ChangeFieldNameConvention1616947360286 implements MigrationInterface {
    name = 'ChangeFieldNameConvention1616947360286'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" DROP CONSTRAINT "FK_9466682df91534dd95e4dbaa616"`);
        await queryRunner.query(`ALTER TABLE "user" DROP CONSTRAINT "UQ_d305f0ed6fbe2be5c870121ef59"`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "isActive"`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "createdDt"`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "updatedDt"`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "deletedDt"`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "isSuperuser"`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "isStaff"`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "loginPlatform"`);
        await queryRunner.query(`DROP TYPE "public"."user_loginplatform_enum"`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "lastLoginDt"`);
        await queryRunner.query(`ALTER TABLE "user" DROP CONSTRAINT "UQ_9466682df91534dd95e4dbaa616"`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "profileId"`);
        await queryRunner.query(`ALTER TABLE "profile" DROP COLUMN "createdDt"`);
        await queryRunner.query(`ALTER TABLE "profile" DROP COLUMN "updatedDt"`);
        await queryRunner.query(`ALTER TABLE "profile" DROP COLUMN "deletedDt"`);
        await queryRunner.query(`ALTER TABLE "user" ADD "created_dt" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "user" ADD "updated_dt" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "user" ADD "deleted_dt" TIMESTAMP`);
        await queryRunner.query(`ALTER TABLE "user" ADD "is_superuser" boolean NOT NULL DEFAULT false`);
        await queryRunner.query(`ALTER TABLE "user" ADD "is_staff" boolean NOT NULL DEFAULT false`);
        await queryRunner.query(`ALTER TABLE "user" ADD "is_active" boolean NOT NULL DEFAULT true`);
        await queryRunner.query(`CREATE TYPE "user_login_platform_enum" AS ENUM('manual', 'apple')`);
        await queryRunner.query(`ALTER TABLE "user" ADD "login_platform" "user_login_platform_enum" NOT NULL DEFAULT 'manual'`);
        await queryRunner.query(`ALTER TABLE "user" ADD "last_login_dt" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP`);
        await queryRunner.query(`ALTER TABLE "user" ADD "profile_id" integer`);
        await queryRunner.query(`ALTER TABLE "user" ADD CONSTRAINT "UQ_f44d0cd18cfd80b0fed7806c3b7" UNIQUE ("profile_id")`);
        await queryRunner.query(`ALTER TABLE "profile" ADD "created_dt" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "profile" ADD "updated_dt" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "profile" ADD "deleted_dt" TIMESTAMP`);
        await queryRunner.query(`ALTER TABLE "user" ADD CONSTRAINT "UQ_490abb1ad11bed1a7366e0ebf9e" UNIQUE ("nickname", "deleted_dt")`);
        await queryRunner.query(`ALTER TABLE "user" ADD CONSTRAINT "FK_f44d0cd18cfd80b0fed7806c3b7" FOREIGN KEY ("profile_id") REFERENCES "profile"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" DROP CONSTRAINT "FK_f44d0cd18cfd80b0fed7806c3b7"`);
        await queryRunner.query(`ALTER TABLE "user" DROP CONSTRAINT "UQ_490abb1ad11bed1a7366e0ebf9e"`);
        await queryRunner.query(`ALTER TABLE "profile" DROP COLUMN "deleted_dt"`);
        await queryRunner.query(`ALTER TABLE "profile" DROP COLUMN "updated_dt"`);
        await queryRunner.query(`ALTER TABLE "profile" DROP COLUMN "created_dt"`);
        await queryRunner.query(`ALTER TABLE "user" DROP CONSTRAINT "UQ_f44d0cd18cfd80b0fed7806c3b7"`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "profile_id"`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "last_login_dt"`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "login_platform"`);
        await queryRunner.query(`DROP TYPE "user_login_platform_enum"`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "is_active"`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "is_staff"`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "is_superuser"`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "deleted_dt"`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "updated_dt"`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "created_dt"`);
        await queryRunner.query(`ALTER TABLE "profile" ADD "deletedDt" TIMESTAMP`);
        await queryRunner.query(`ALTER TABLE "profile" ADD "updatedDt" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "profile" ADD "createdDt" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "user" ADD "profileId" integer`);
        await queryRunner.query(`ALTER TABLE "user" ADD CONSTRAINT "UQ_9466682df91534dd95e4dbaa616" UNIQUE ("profileId")`);
        await queryRunner.query(`ALTER TABLE "user" ADD "lastLoginDt" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP`);
        await queryRunner.query(`CREATE TYPE "public"."user_loginplatform_enum" AS ENUM('manual', 'apple')`);
        await queryRunner.query(`ALTER TABLE "user" ADD "loginPlatform" "user_loginplatform_enum" NOT NULL DEFAULT 'manual'`);
        await queryRunner.query(`ALTER TABLE "user" ADD "isStaff" boolean NOT NULL DEFAULT false`);
        await queryRunner.query(`ALTER TABLE "user" ADD "isSuperuser" boolean NOT NULL DEFAULT false`);
        await queryRunner.query(`ALTER TABLE "user" ADD "deletedDt" TIMESTAMP`);
        await queryRunner.query(`ALTER TABLE "user" ADD "updatedDt" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "user" ADD "createdDt" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "user" ADD "isActive" boolean NOT NULL DEFAULT true`);
        await queryRunner.query(`ALTER TABLE "user" ADD CONSTRAINT "UQ_d305f0ed6fbe2be5c870121ef59" UNIQUE ("deletedDt", "nickname")`);
        await queryRunner.query(`ALTER TABLE "user" ADD CONSTRAINT "FK_9466682df91534dd95e4dbaa616" FOREIGN KEY ("profileId") REFERENCES "profile"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

}
