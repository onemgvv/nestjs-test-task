import {Exclude, Expose} from "class-transformer";
import {IsEmail, IsOptional, IsString, MaxLength} from "class-validator";

@Exclude()
export class UpdateUserDto {
    @Expose()
    @IsEmail()
    @IsOptional()
    @MaxLength(100)
    email?: string;

    @Expose()
    @IsString()
    @IsOptional()
    @MaxLength(100)
    password?: string;

    @Expose()
    @IsString()
    @IsOptional()
    @MaxLength(30)
    nickname: string;
}