import {Module} from "@nestjs/common";
import {TagRepoProvider} from "@persistence/app/tag/tag.provider";
import {TypeOrmModule} from "@nestjs/typeorm";
import {TagEntity} from "@persistence/app/tag/tag.entity";
import {TagRepositoryImpl} from "@persistence/app/tag/tag.repository";

@Module({
    imports: [TypeOrmModule.forFeature([TagEntity, TagRepositoryImpl])],
    providers: [TagRepoProvider],
    exports: [TagRepoProvider, TypeOrmModule]
})
export class TagModule {}