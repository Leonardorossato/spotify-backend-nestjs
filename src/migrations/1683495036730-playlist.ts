import { MigrationInterface, QueryRunner } from 'typeorm';

export class Playlist1683495036730 implements MigrationInterface {
  name = 'Playlist1683495036730';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "playlist" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "songId" integer NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_538c2893e2024fabc7ae65ad142" PRIMARY KEY ("id"))`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "playlist"`);
  }
}
