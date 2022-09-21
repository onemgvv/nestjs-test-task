import {Exclude, Expose} from "class-transformer";
import {IsNotEmpty, IsNumber, IsOptional, IsString, MaxLength} from "class-validator";
import {ApiProperty} from "@nestjs/swagger";

@Exclude()
export class CreateTagDto {
    @ApiProperty({
        type: String,
        description: 'Название тэга',
        example: 'backend',
        maxLength: 40,
    })
    @Expose()
    @IsString()
    @IsNotEmpty()
    @MaxLength(40)
    name: string;

    @ApiProperty({
        type: String,
        description: 'Порядок сортировки',
        example: 0,
        default: 0,
    })
    @Expose()
    @IsNumber()
    @IsOptional()
    sortOrder: number;
}