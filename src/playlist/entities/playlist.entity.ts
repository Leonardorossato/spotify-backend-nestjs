import { Song } from '@/songs/entities/song.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Playlist {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ type: 'varchar' })
  name!: string;

  @ManyToMany(() => Song, (song) => song.id)
  @JoinColumn({ name: 'songId' })
  song!: number[];

  @Column({ nullable: false })
  songId!: number;

  @CreateDateColumn()
  createdAt?: Date;
}
