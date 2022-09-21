import {Exclude, Expose} from "class-transformer";
import {IsNumber, IsOptional, IsString, MaxLength} from "class-validator";
import {ApiProperty} from "@nestjs/swagger";

@Exclude()
export class UpdateTagDto {
    @ApiProperty({
        type: String,
        description: 'Название тэга',
        example: 'backend',
        maxLength: 40,
        required: false
    })
    @Expose()
    @IsString()
    @IsOptional()
    @MaxLength(40)
    name?: string;

    @ApiProperty({
        type: String,
        description: 'Порядок сортировки',
        example: 0,
        default: 0,
        required: false
    })
    @Expose()
    @IsNumber()
    @IsOptional()
    sortOrder?: number;
}