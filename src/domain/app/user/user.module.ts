import { Module } from '@nestjs/common';
import { UserModule as UserRepoModule } from '@persistence/app/user/user.module';
import { UserServiceProvider } from './user.provider';
import {UtilsModule} from "@utils/utils.module";


@Module({
    imports: [UserRepoModule, UtilsModule],
    providers: [UserServiceProvider],
    exports: [UserServiceProvider]
})
export class UserModule {}
