import {Exclude, Expose} from "class-transformer";
import {IsNotEmpty, IsOptional, IsString, MaxLength} from "class-validator";
import {ApiProperty} from "@nestjs/swagger";

@Exclude()
export class RegisterDto {
    @ApiProperty({
        type: String,
        description: 'Nickanme',
        example: 'onemgvv',
    })
    @IsString()
    @MaxLength(30)
    @IsNotEmpty()
    @Expose()
    nickname: string;

    @ApiProperty({
        type: String,
        description: 'Email',
        example: 'onemgvv@gmail.com',
    })
    @IsString()
    @MaxLength(100)
    @IsNotEmpty()
    @Expose()
    email: string;

    @ApiProperty({
        type: String,
        description: 'Пароль',
        example: 'СуперСложныйПароль123',
    })
    @IsString()
    @MaxLength(100)
    @IsNotEmpty()
    @Expose()
    password: string;
}
