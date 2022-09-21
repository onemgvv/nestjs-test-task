import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  ForbiddenException,
  Get,
  HttpCode,
  HttpStatus,
  Inject,
  NotFoundException,
  Param,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import {
  TAG_CREATED,
  TAG_DATA_UPDATED,
  TAG_DELETE_NOT_ACCESS,
  TAG_DELETED,
  TAG_EDIT_NOT_ACCESS,
  TAG_EXIST,
  TAG_FOUNDED,
  TAG_NOT_EXIST,
  TAG_SERVICE,
  TAG_WITH_ID_NOT_EXIST,
  UNAUTHORIZED_EXCEPTION, USER_SERVICE,
} from '@config/constants';
import { TagService } from '@domain/app/tag/interface/service.interface';
import TagModel from '@domain/app/tag/tag.model';
import { CustomAuthGuard } from '@common/guards/jwt-auth.guard';
import { CreateTagDto } from '@api/app/tag/dto/create.dto';
import { CurrentUser } from '@decorators/current-user.decortor';
import { UpdateTagDto } from '@api/app/tag/dto/update.dto';
import UserEntity from '@persistence/app/user/user.entity';
import {
  ApiBody,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import UserService from "@domain/app/user/interface/service.interface";
import CreatorModel from "@domain/app/tag/creator.model";
import {IQuery} from "@common/interface/query.interface";

const TagService = () => Inject(TAG_SERVICE);
const UserService = () => Inject(USER_SERVICE);

@ApiTags('Тэги')
@Controller('tag')
export class TagController {
  constructor(
      @TagService() private tagService: TagService,
      @UserService() private userService: UserService
    ) {}

  @ApiOperation({ summary: 'Создать тэг' })
  @ApiResponse({ status: 201, description: TAG_CREATED })
  @ApiResponse({ status: 400, description: TAG_EXIST })
  @ApiResponse({ status: 401, description: UNAUTHORIZED_EXCEPTION })
  @Post()
  @HttpCode(HttpStatus.CREATED)
  @UseGuards(CustomAuthGuard)
  async createTag(@CurrentUser() user: UserEntity, @Body() createDto: CreateTagDto) {
    const candidate = await this.tagService.getByName(createDto.name);
    if (candidate) {
      throw new BadRequestException();
    }

    const tag = await this.tagService.create({ ...createDto, creator: user.id });
    return {
      name: tag.name,
      sortOrder: tag.sortOrder,
    };
  }

  @ApiOperation({ summary: 'Получить тэг по id' })
  @ApiResponse({ status: 200, description: TAG_FOUNDED })
  @ApiResponse({ status: 404, description: TAG_NOT_EXIST })
  @ApiResponse({ status: 401, description: UNAUTHORIZED_EXCEPTION })
  @ApiParam({ name: 'id', type: Number })
  @Get('/:id')
  @HttpCode(HttpStatus.OK)
  @UseGuards(CustomAuthGuard)
  async getTagById(@Param('id') id: number) {
    const tag = await this.tagService.getById(id);
    if (!tag) {
      throw new NotFoundException(TAG_NOT_EXIST);
    }

    const tagModel = TagModel.toModel(tag);

    return {
      creator: tagModel.Creator,
      name: tagModel.Name,
      sortOrder: tagModel.SortOrder,
    };
  }

  @ApiOperation({ summary: 'Получить тэг по query запросу' })
  @ApiResponse({ status: 200, description: TAG_FOUNDED })
  @ApiResponse({ status: 404, description: TAG_NOT_EXIST })
  @ApiResponse({ status: 401, description: UNAUTHORIZED_EXCEPTION })
  @Get()
  @HttpCode(HttpStatus.OK)
  @UseGuards(CustomAuthGuard)
  async getSorted(@Query() query: IQuery) {
    const tags = await this.tagService.getSorted(query);
    const result = await Promise.all(tags.map(one => TagModel.toModel(one)));

    return { data: result, "meta": { "offset": query.offset, length: query.length, quantity: tags.length } };
  }

  @ApiOperation({ summary: 'Обновить тэг' })
  @ApiResponse({ status: 200, description: TAG_DATA_UPDATED })
  @ApiResponse({ status: 404, description: TAG_WITH_ID_NOT_EXIST })
  @ApiResponse({ status: 403, description: TAG_EDIT_NOT_ACCESS })
  @ApiResponse({ status: 401, description: UNAUTHORIZED_EXCEPTION })
  @ApiParam({ name: 'id', type: Number })
  @ApiBody({ type: UpdateTagDto })
  @Put('/:id')
  @HttpCode(HttpStatus.OK)
  @UseGuards(CustomAuthGuard)
  async update(
    @CurrentUser() user: UserEntity,
    @Body() updateDto: UpdateTagDto,
    @Param('id') id: number,
  ) {
    const tag = await this.tagService.getById(id);
    if (!tag) {
      throw new NotFoundException(TAG_WITH_ID_NOT_EXIST);
    }

    if (tag.creator !== user.id) {
      throw new ForbiddenException(TAG_EDIT_NOT_ACCESS);
    }

    return {
      creator: CreatorModel.toModel(tag.user),
      ...await this.tagService.update(tag, updateDto)
    };
  }

  @ApiOperation({ summary: 'Удалить тэг' })
  @ApiResponse({ status: 200, description: TAG_DELETED })
  @ApiResponse({ status: 401, description: UNAUTHORIZED_EXCEPTION })
  @ApiResponse({ status: 403, description: TAG_DELETE_NOT_ACCESS })
  @ApiResponse({ status: 404, description: TAG_WITH_ID_NOT_EXIST })
  @ApiParam({ name: 'id', type: Number })
  @Delete('/:id')
  @HttpCode(HttpStatus.OK)
  @UseGuards(CustomAuthGuard)
  async delete(@CurrentUser() user: UserEntity, @Param('id') id: number) {
    const tag = await this.tagService.getById(id);
    if (!tag) {
      throw new NotFoundException(TAG_WITH_ID_NOT_EXIST);
    }

    if (tag.creator !== user.id) {
      throw new ForbiddenException(TAG_DELETE_NOT_ACCESS);
    }

    await this.tagService.delete(tag);
    return this.tagService.userTags(user.id);
  }
}
