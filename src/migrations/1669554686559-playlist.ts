import { MigrationInterface, QueryRunner } from "typeorm";

export class playlist1669554686559 implements MigrationInterface {
    name = 'playlist1669554686559'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "playlist" ("id" SERIAL NOT NULL, "name" character varying(250) NOT NULL, "userId" integer NOT NULL, "description" character varying(250) NOT NULL, "songs" character varying DEFAULT '[]', "img" character varying NOT NULL, CONSTRAINT "PK_538c2893e2024fabc7ae65ad142" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "playlist" ADD CONSTRAINT "FK_92ca9b9b5394093adb6e5f55c4b" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "playlist" DROP CONSTRAINT "FK_92ca9b9b5394093adb6e5f55c4b"`);
        await queryRunner.query(`DROP TABLE "playlist"`);
    }

}
