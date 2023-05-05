import { MigrationInterface, QueryRunner } from 'typeorm';

export class Songs1683294878075 implements MigrationInterface {
  name = 'Songs1683294878075';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "song" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "duration" character varying NOT NULL, CONSTRAINT "PK_baaa977f861cce6ff954ccee285" PRIMARY KEY ("id"))`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "song"`);
  }
}
