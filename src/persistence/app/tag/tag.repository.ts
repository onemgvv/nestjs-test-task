import TagRepository from '@persistence/app/tag/interface/repository.interface';
import { Injectable } from '@nestjs/common';
import { EntityRepository, Repository } from 'typeorm';
import { TagEntity } from '@persistence/app/tag/tag.entity';

@Injectable()
@EntityRepository(TagEntity)
export class TagRepositoryImpl
  extends Repository<TagEntity>
  implements TagRepository
{
  /**
   *
   * Find tags in transaction
   *
   * @param {number[]} ids
   * @return Promise<TagEntity[]>
   *
   */
  async findMany(ids: number[]): Promise<TagEntity[]> {
    const tags = await this.findByIds(ids, { transaction: true });
    if (tags.length < ids.length) {
      return [];
    }

    return tags;
  }

  /**
   *
   * Find bby id
   *
   * @param {number} id
   * @return Promise<TagEntity>
   *
   */
  findById(id: number): Promise<TagEntity> {
    return this.findOne(id);
  }
}
