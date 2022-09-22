import {
    BadRequestException,
    Body, CACHE_MANAGER,
    Controller,
    Delete,
    Get,
    HttpCode,
    HttpStatus,
    Inject, Param, Post,
    Put,
    UseGuards,
} from '@nestjs/common';
import {CurrentUser} from "@decorators/current-user.decortor";
import UserEntity from "@persistence/app/user/user.entity";
import {
    CACHE_USER_KEY,
    EMAIL_IS_BUSY, NICKNAME_IS_BUSY,
    SUCCESSFUL_UPDATE, SUCCESSFUL_USER_DELETE,
    TAG_FOUNDED, TAG_SERVICE, UNAUTHORIZED_EXCEPTION,
    USER_FOUND, USER_SERVICE, USER_TAG_ADDED,
    USER_TAG_DELETED
} from "@config/constants";
import {TagService} from "@domain/app/tag/interface/service.interface";
import {UpdateUserDto} from "@api/app/user/dto/update.dto";
import UserService from "@domain/app/user/interface/service.interface";
import {CustomAuthGuard} from "@common/guards/jwt-auth.guard";
import {AddTagsDto} from "@api/app/user/dto/add-tags.dto";
import UserTagsModel from "@domain/app/user/user-tags.model";
import {ApiBody, ApiOperation, ApiParam, ApiResponse, ApiTags} from "@nestjs/swagger";
import {Cache} from "cache-manager";
import {IUserResponse} from "@common/interface/api.interface";
import TagModel from "@domain/app/tag/tag.model";

const UserService = () => Inject(USER_SERVICE);
const TagService = () => Inject(TAG_SERVICE);

@ApiTags('Пользователи')
@Controller('user')
export class UserController {
    constructor(
        @UserService() private userService: UserService,
        @TagService() private tagService: TagService,
        @Inject(CACHE_MANAGER) private cacheManager: Cache
    ) {}

    @ApiOperation({ summary: "Получить авторизованного пользователя" })
    @ApiResponse({ status: 200, description: USER_FOUND })
    @ApiResponse({ status: 401, description: UNAUTHORIZED_EXCEPTION })
    @Get()
    @UseGuards(CustomAuthGuard)
    @HttpCode(HttpStatus.OK)
    async find(@CurrentUser() user: UserEntity) {
        const cache = await this.cacheManager.get<IUserResponse>(CACHE_USER_KEY)
        if(cache) return cache;

        const tags = [];
        const actual = await this.userService.getById(user.id);
        actual.tags.map(one => {
            tags.push(UserTagsModel.toModel(one));
        })

        const response = { email: user.email, nickname: user.nickname, tags };
        await this.cacheManager.set<IUserResponse>(CACHE_USER_KEY, response);
        return response;
    }

    @ApiOperation({ summary: "Обновить данные пользователя" })
    @ApiResponse({ status: 200, description: SUCCESSFUL_UPDATE })
    @ApiResponse({ status: 400, description: EMAIL_IS_BUSY })
    @ApiResponse({ status: 400, description: NICKNAME_IS_BUSY })
    @ApiResponse({ status: 401, description: UNAUTHORIZED_EXCEPTION })
    @ApiBody({ type: UpdateUserDto })
    @Put()
    @UseGuards(CustomAuthGuard)
    @HttpCode(HttpStatus.OK)
    async update(@CurrentUser() user: UserEntity, @Body() updateDto: UpdateUserDto) {
        if(updateDto.email && await this.userService.isBusyEmail(updateDto.email)) {
            throw new BadRequestException(EMAIL_IS_BUSY);
        }

        if(updateDto.nickname && await this.userService.isBusyNickname(updateDto.nickname)) {
            throw new BadRequestException(NICKNAME_IS_BUSY);
        }

        const result = await this.userService.update(user, updateDto);

        const cache = await this.cacheManager.get<IUserResponse>(CACHE_USER_KEY);
        if(cache && cache.email === user.email) {
            cache.email = result.email;
            cache.nickname = result.nickname;
            await this.cacheManager.set(CACHE_USER_KEY, cache);
        }

        return result;
    }

    @ApiOperation({ summary: "Удаление пользователя" })
    @ApiResponse({ status: 200, description: SUCCESSFUL_USER_DELETE })
    @ApiResponse({ status: 401, description: UNAUTHORIZED_EXCEPTION })
    @Delete()
    @UseGuards(CustomAuthGuard)
    @HttpCode(HttpStatus.OK)
    async delete(@CurrentUser() user: UserEntity) {
        const cache = await this.cacheManager.get<IUserResponse>(CACHE_USER_KEY);
        if(cache && cache.email === user.email) {
            await this.cacheManager.del(CACHE_USER_KEY);
        }

        return { status: !!await user.remove() };
    }

    @ApiOperation({ summary: "Добавить тэги пользователю" })
    @ApiResponse({ status: 200, description: USER_TAG_ADDED })
    @ApiResponse({ status: 401, description: UNAUTHORIZED_EXCEPTION })
    @ApiBody({ type: AddTagsDto })
    @Post("/tag")
    @UseGuards(CustomAuthGuard)
    @HttpCode(HttpStatus.OK)
    async addTags(@CurrentUser() user: UserEntity, @Body() dto: AddTagsDto) {
        const { tags } = dto;

        const fResult = await this.tagService.findMany(tags);
        if(!fResult) {
            return { tags: user.tags }
        }

        user.tags = [...user.tags, ...fResult];
        await user.save();
        await this.updateCache(user);

        return { tags: user.tags }
    }

    @ApiOperation({ summary: "Удалить тэг пользователя по id" })
    @ApiResponse({ status: 200, description: USER_TAG_DELETED })
    @ApiResponse({ status: 401, description: UNAUTHORIZED_EXCEPTION })
    @ApiParam({ name: "id", type: Number })
    @Delete("/tag/:id")
    @UseGuards(CustomAuthGuard)
    @HttpCode(HttpStatus.OK)
    async removeTag(@CurrentUser() user: UserEntity, @Param('id') id: number) {
        const actual = await this.userService.findOne("id", user.id);

        user.tags = actual.tags.filter(one => one.id !== id);
        await user.save();
        await this.updateCache(user);
        return { tags: user.tags }
    }

    @ApiOperation({ summary: "Получить тэги пользователя" })
    @ApiResponse({ status: 200, description: TAG_FOUNDED })
    @ApiResponse({ status: 401, description: UNAUTHORIZED_EXCEPTION })
    @Get("/tag/my")
    @UseGuards(CustomAuthGuard)
    @HttpCode(HttpStatus.OK)
    async myTags(@CurrentUser() user: UserEntity) {
        const tags = await this.tagService.userTags(user.id);

        return {
            tags: await Promise.all(tags.map(one => {
                return UserTagsModel.toModel(one);
            }))
        }
    }

    private async updateCache(user: UserEntity) {
        const cache = await this.cacheManager.get<IUserResponse>(CACHE_USER_KEY);
        if(cache && cache.email === user.email) {
            cache.tags = await Promise.all(user.tags.map(one => TagModel.toModel(one)));
            await this.cacheManager.set(CACHE_USER_KEY, cache);
        }
    }
}
