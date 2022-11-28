import { ApiProperty } from "@nestjs/swagger";
import { Users } from "src/users/entities/users.entity";

export class CreatePlaylistDTO{
    @ApiProperty({nullable: false, minLength: 3, maxLength: 250})
    name: string;

    @ApiProperty({nullable:false})
    userId: Users;

    @ApiProperty({nullable:false})
    description: string;

    @ApiProperty({nullable:false})
    songs: string;

    @ApiProperty({nullable: false})
    img: string;
}