import {
    BadRequestException,
    Body,
    Controller, Delete, ForbiddenException,
    Get,
    HttpCode,
    HttpStatus,
    Inject,
    NotFoundException,
    Param,
    Post, Put, Query,
    UseGuards
} from "@nestjs/common";
import {TAG_SERVICE} from "@config/constants";
import {TagService} from "@domain/app/tag/interface/service.interface";
import TagModel from "@domain/app/tag/tag.model";
import {CustomAuthGuard} from "@common/guards/jwt-auth.guard";
import {CreateTagDto} from "@api/app/tag/dto/create.dto";
import {CurrentUser} from "@decorators/current-user.decortor";
import UserEntity from "@persistence/app/user/user.entity";
import {UpdateTagDto} from "@api/app/tag/dto/update.dto";

const TagService = () => Inject(TAG_SERVICE);

@Controller("tag")
export class TagController {
    constructor(@TagService() private tagService: TagService) {}

    @Post()
    @HttpCode(HttpStatus.CREATED)
    @UseGuards(CustomAuthGuard)
    async createTag(@Body() createDto: CreateTagDto) {
        const candidate = await this.tagService.getByName(createDto.name);
        if(candidate) {
            throw new BadRequestException("Тэг с таким название уже существует");
        }

        const tag = await this.tagService.create(createDto);
        return {
            name: tag.name,
            sortOrder: tag.sortOrder
        }
    }

    @Get("/:id")
    @HttpCode(HttpStatus.OK)
    @UseGuards(CustomAuthGuard)
    async getTagById(@Param("id") id: number) {
        const tag = await this.tagService.getById(id);
        if(!tag) {
            throw new NotFoundException("Tag not found");
        }

        const tagModel = TagModel.toModel(tag);
        return {
            creator: tagModel.creator,
            name: tagModel.name,
            sortOrder: tagModel.sortOrder
        }
    }

    @Get()
    @HttpCode(HttpStatus.OK)
    @UseGuards(CustomAuthGuard)
    async getSorted(@Query() query) {
        return query;
    }

    @Put("/:id")
    @HttpCode(HttpStatus.OK)
    @UseGuards(CustomAuthGuard)
    async update(@CurrentUser() user: UserEntity, @Body() updateDto: UpdateTagDto, @Param("id") id: number) {
        const tag = await this.tagService.getById(id);
        if(!tag) {
            throw new NotFoundException("Тэг с таким id не сущетсвует");
        }

        console.log(user);

        console.log(tag.creator);
        console.log(user.id);

        if(tag.creator !== user.id) {
            throw new ForbiddenException("Вы не можете редактировать этот тэг");
        }

        return this.tagService.update(tag, updateDto);
    }

    @Delete("/:id")
    @HttpCode(HttpStatus.OK)
    @UseGuards(CustomAuthGuard)
    async delete(@CurrentUser() user: UserEntity, @Param("id") id: number) {
        const tag = await this.tagService.getById(id);
        if(!tag) {
            throw new NotFoundException("Тэг с таким id не сущетсвует");
        }

        console.log(user);

        console.log(tag.creator);
        console.log(user.id);

        if(tag.creator !== user.id) {
            throw new ForbiddenException("Вы не можете удалить этот тэг");
        }

        await this.tagService.delete(tag);
        return this.tagService.userTags(user.id);
    }
}