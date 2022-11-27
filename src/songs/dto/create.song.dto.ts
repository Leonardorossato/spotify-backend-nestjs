import { ApiProperty } from "@nestjs/swagger";

export class CreateSongDTO{
    @ApiProperty({nullable: false})
    name: string;

    @ApiProperty({ nullable: false })
    artist: string;

    @ApiProperty({ nullable: false })
    img: string;

    @ApiProperty({ nullable: false })
    duration: string;
}