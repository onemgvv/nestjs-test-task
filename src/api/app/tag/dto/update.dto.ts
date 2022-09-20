import {Exclude, Expose} from "class-transformer";
import {IsNumber, IsOptional, IsString, MaxLength} from "class-validator";

@Exclude()
export class UpdateTagDto {
    @Expose()
    @IsString()
    @IsOptional()
    @MaxLength(40)
    name?: string;

    @Expose()
    @IsNumber()
    @IsOptional()
    sortOrder?: number;
}