import { MigrationInterface, QueryRunner } from 'typeorm';

export class users1669552944044 implements MigrationInterface {
  name = 'users1669552944044';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "users" ("id" SERIAL NOT NULL, "name" character varying(250) NOT NULL, "email" character varying(250) NOT NULL, "cpf" character varying(11) NOT NULL, "password" character varying(250) NOT NULL, "likedSongs" character varying, "playlist" character varying DEFAULT '[]', CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email"), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "users"`);
  }
}
