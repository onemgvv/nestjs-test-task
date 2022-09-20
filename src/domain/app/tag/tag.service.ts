import {Inject, Injectable} from "@nestjs/common";
import {TagService} from "@domain/app/tag/interface/service.interface";
import {TagEntity} from "@persistence/app/tag/tag.entity";
import {TAG_REPOSITORY} from "@config/constants";
import TagRepository from "@persistence/app/tag/interface/repository.interface";
import {CreateTag} from "@domain/app/tag/interface/create.interface";
import {UpdateTag} from "@domain/app/tag/interface/update.interface";

const TagRepo = () => Inject(TAG_REPOSITORY);

@Injectable()
export class TagServiceImpl implements TagService {
    constructor(@TagRepo() private tagRepository: TagRepository) {}

    /**
     *
     * Create new Tag Entity in db
     *
     * @param {CreateTag} data
     * @return Promise<TagEntity>
     *
     */
    create(data: CreateTag): Promise<TagEntity> {
        return this.tagRepository.save(data);
    }

    /**
     *
     * Update tag entity in db
     *
     * @param {TagEntity} tag
     * @param {UpdateTag} data
     * @return Promise<TagEntity>
     *
     */
    async update(tag: TagEntity, data: UpdateTag): Promise<UpdateTag> {
        Object.keys(data).filter(key => !!key).forEach(key => {
            tag[key] = data[key];
        });

        await tag.save();
        return { name: tag.name, sortOrder: tag.sortOrder }
    }

    /**
     *
     * Delete tag from db
     *
     * @param {TagEntity} tag
     * @return Promise<TagEntity>
     *
     */
    delete(tag: TagEntity): Promise<TagEntity> {
        return tag.remove();
    }
    /**
     *
     * Get tag by name
     *
     * @param {string} name
     * @return Promise<TagEntity>
     *
     */
    getByName(name: string): Promise<TagEntity> {
        return this.tagRepository.findOne({ where: { name } });
    }

    /**
     *
     * Find ALl User Tags
     *
     * @param {string} userId
     * @return Promise<TagEntity[]>
     *
     */
    userTags(userId: string): Promise<TagEntity[]> {
        return this.tagRepository.find({ where: { creator: userId } });
    }

    /**
     *
     * Get tag by id
     *
     * @param {number} id
     * @return Promise<TagEntity>
     *
     */
    getById(id: number): Promise<TagEntity> {
        return this.tagRepository.findOne(id);
    }

    getSorted(options: unknown): Promise<TagEntity[]> {
        return Promise.resolve([]);
    }
}