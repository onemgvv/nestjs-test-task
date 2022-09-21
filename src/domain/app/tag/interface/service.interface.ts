import {TagEntity} from "@persistence/app/tag/tag.entity";
import {CreateTag} from "@domain/app/tag/interface/create.interface";
import {UpdateTag} from "@domain/app/tag/interface/update.interface";

export interface TagService {
    /**
     *
     * Create new Tag Entity in db
     *
     * @param {CreateTag} data
     * @return Promise<TagEntity>
     *
     */
    create(data: CreateTag): Promise<TagEntity>;
    /**
     *
     * Update tag entity in db
     *
     * @param {TagEntity} tag
     * @param {UpdateTag} data
     * @return Promise<TagEntity>
     *
     */
    update(tag: TagEntity, data: UpdateTag): Promise<UpdateTag>;
    /**
     *
     * Delete tag from db
     *
     * @param {TagEntity} tag
     * @return Promise<TagEntity>
     *
     */
    delete(tag: TagEntity): Promise<TagEntity>;
    /**
     *
     * Get tag by id
     *
     * @param {number} id
     * @return Promise<TagEntity>
     *
     */
    getById(id: number): Promise<TagEntity>;
    /**
     *
     * Get tag by name
     *
     * @param {string} name
     * @return Promise<TagEntity>
     *
     */
    getByName(name: string): Promise<TagEntity>;
    /**
     *
     * Find ALl User Tags
     *
     * @param {string} userId
     * @return Promise<TagEntity[]>
     *
     */
    userTags(userId: string): Promise<TagEntity[]>;

    /**
     *
     * Find Many Tags for Add to User
     *
     * @param {number} ids
     * @returns {Promise<TagEntity[]>}
     *
     */
    findMany(ids: number[]): Promise<TagEntity[]>

    getSorted(options: unknown): Promise<TagEntity[]>;
}