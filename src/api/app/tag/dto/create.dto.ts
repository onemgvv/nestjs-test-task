import {Exclude, Expose} from "class-transformer";
import {IsNotEmpty, IsNumber, IsOptional, IsString, MaxLength} from "class-validator";

@Exclude()
export class CreateTagDto {
    @Expose()
    @IsString()
    @IsNotEmpty()
    @MaxLength(40)
    name: string;

    @Expose()
    @IsNumber()
    @IsOptional()
    sortOrder: number;
}