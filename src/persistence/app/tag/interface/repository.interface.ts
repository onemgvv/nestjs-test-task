import {Repository} from "typeorm";
import {TagEntity} from "@persistence/app/tag/tag.entity";

export default interface TagRepository extends Repository<TagEntity> {
    /**
     *
     * Find tags in transaction
     *
     * @param {number[]} ids
     * @return Promise<TagEntity[]>
     *
     */
    findMany(ids: number[]): Promise<TagEntity[]>;

    /**
     *
     * Find bby id
     *
     * @param {number} id
     * @return Promise<TagEntity>
     *
     */
    findById(id: number): Promise<TagEntity>;
}