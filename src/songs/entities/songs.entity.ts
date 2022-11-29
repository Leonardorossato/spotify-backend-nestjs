import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Songs {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false, type: 'varchar', length: 250 })
  name: string;

  @Column({ nullable: false, type: 'varchar', length: 250, unique: true })
  artist: string;

  @Column({ nullable: false, type: 'varchar', length: 250 })
  img: string;

  @Column({ nullable: false, type: 'varchar', length: 4 })
  duration: string;
}
