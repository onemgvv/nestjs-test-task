import {Exclude, Expose} from "class-transformer";
import {IsNotEmpty, IsString, MaxLength} from "class-validator";
import {ApiProperty} from "@nestjs/swagger";

@Exclude()
export class LoginDto {
    @ApiProperty({
        type: String,
        description: 'Email',
        example: 'onemgvv@gmail.com',
        maxLength: 100,
        nullable: false,
    })
    @Expose()
    @IsString()
    @MaxLength(100)
    @IsNotEmpty()
    email: string;


    @ApiProperty({
        type: String,
        description: 'Пароль',
        example: 'СуперСложныйПароль123',
        maxLength: 100,
        nullable: false,
    })
    @Expose()
    @IsString()
    @MaxLength(100)
    @IsNotEmpty()
    password: string;
}
