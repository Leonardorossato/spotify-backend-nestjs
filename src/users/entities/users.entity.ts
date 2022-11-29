import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Users {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false, type: 'varchar', length: 250 })
  name: string;

  @Column({ nullable: false, type: 'varchar', length: 250, unique: true })
  email: string;

  @Column({ nullable: false, type: 'varchar', length: 11 })
  cpf: string;

  @Column({ nullable: false, type: 'varchar', length: 250 })
  password: string;

  @Column({ nullable: true, type: 'varchar' })
  likedSongs: string;

  @Column({ nullable: true, type: 'varchar', default: [] })
  playlist: string[] = [];
}
