import { MigrationInterface, QueryRunner } from "typeorm";

export class songs1669554643621 implements MigrationInterface {
    name = 'songs1669554643621'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "songs" ("id" SERIAL NOT NULL, "name" character varying(250) NOT NULL, "artist" character varying(250) NOT NULL, "img" character varying(250) NOT NULL, "duration" character varying(4) NOT NULL, CONSTRAINT "UQ_04abc8d35f9e29d320df36c0baa" UNIQUE ("artist"), CONSTRAINT "PK_e504ce8ad2e291d3a1d8f1ea2f4" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "songs"`);
    }

}
