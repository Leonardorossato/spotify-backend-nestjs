import { Users } from "../../users/entities/users.entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Playlist{
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ nullable: false, type: 'varchar', length: 250 })
    name: string;

    @ManyToOne(() => Users)
    @JoinColumn({name: 'userId' })
    user?: Users;

    @Column({nullable: false})
    userId?: number;

    @Column({ nullable: false, type: 'varchar', length: 250 })
    description: string;

    @Column({ nullable: true, type: 'varchar', default: [] })
    songs: string;

    @Column({nullable: false, type: 'varchar'})
    img: string;
}