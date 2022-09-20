import {Module} from "@nestjs/common";
import {TagModule as TagRepoModule} from "@persistence/app/tag/tag.module";
import {TagServiceProvider} from "@domain/app/tag/tag.provider";

@Module({
    imports: [TagRepoModule],
    providers: [TagServiceProvider],
    exports: [TagServiceProvider]
})
export class TagModule {}