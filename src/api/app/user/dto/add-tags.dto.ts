import {Exclude, Expose} from "class-transformer";
import {IsNotEmpty, IsNumber} from "class-validator";
import {ApiProperty} from "@nestjs/swagger";

@Exclude()
export class AddTagsDto {
    @ApiProperty({
        type: Array,
        description: 'Массив тэгов',
        example: '[1, 2, 3]',
    })
    @Expose()
    @IsNotEmpty()
    @IsNumber({}, { each: true })
    tags: number[];
}