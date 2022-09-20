import {
    BadRequestException,
    Body,
    Controller,
    Delete,
    Get,
    HttpCode,
    HttpStatus,
    Inject,
    Put,
    UseGuards
} from '@nestjs/common';
import {CurrentUser} from "@decorators/current-user.decortor";
import UserEntity from "@persistence/app/user/user.entity";
import {TAG_SERVICE, USER_SERVICE} from "@config/constants";
import {TagService} from "@domain/app/tag/interface/service.interface";
import {UpdateUserDto} from "@api/app/user/dto/update.dto";
import UserService from "@domain/app/user/interface/service.interface";
import {CustomAuthGuard} from "@common/guards/jwt-auth.guard";

const UserService = () => Inject(USER_SERVICE);
const TagService = () => Inject(TAG_SERVICE);

@Controller('user')
export class UserController {
    constructor(
        @UserService() private userService: UserService,
        @TagService() private tagService: TagService,
    ) {}

    @Get()
    @UseGuards(CustomAuthGuard)
    @HttpCode(HttpStatus.OK)
    async find(@CurrentUser() user: UserEntity) {
        const tags = await this.tagService.userTags(user.id);

        return {
            email: user.email,
            nickname: user.nickname,
            tags
        }
    }

    @Put()
    @UseGuards(CustomAuthGuard)
    @HttpCode(HttpStatus.OK)
    async update(@CurrentUser() user: UserEntity, @Body() updateDto: UpdateUserDto) {
        if(updateDto.email && await this.userService.isBusyEmail(updateDto.email)) {
            throw new BadRequestException("Этот email-адрес занят");
        }

        if(updateDto.nickname && await this.userService.isBusyNickname(updateDto.nickname)) {
            throw new BadRequestException("Этот nickname занят");
        }

        return this.userService.update(user, updateDto);
    }

    @Delete()
    @UseGuards(CustomAuthGuard)
    @HttpCode(HttpStatus.OK)
    async delete(@CurrentUser() user: UserEntity) {
        await user.remove();
        return { status: true };
    }
}
