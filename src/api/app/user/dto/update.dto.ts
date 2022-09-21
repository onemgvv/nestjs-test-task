import {Exclude, Expose} from "class-transformer";
import {IsEmail, IsOptional, IsString, MaxLength} from "class-validator";
import {ApiProperty} from "@nestjs/swagger";

@Exclude()
export class UpdateUserDto {
    @ApiProperty({
        type: String,
        description: 'Email',
        example: 'onemgvv@gmail.com',
        required: false
    })
    @Expose()
    @IsEmail()
    @IsOptional()
    @MaxLength(100)
    email?: string;

    @ApiProperty({
        type: String,
        description: 'пароль',
        example: 'СуперСложныйПароль123',
        required: false
    })
    @Expose()
    @IsString()
    @IsOptional()
    @MaxLength(100)
    password?: string;

    @ApiProperty({
        type: String,
        description: 'Nickname',
        example: 'onemgvv',
        required: false
    })
    @Expose()
    @IsString()
    @IsOptional()
    @MaxLength(30)
    nickname: string;
}