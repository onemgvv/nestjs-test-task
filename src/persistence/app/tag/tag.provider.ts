import {Provider} from "@nestjs/common";
import {TAG_REPOSITORY} from "@config/constants";
import {Connection, getConnectionManager} from "typeorm";
import {TagRepositoryImpl} from "@persistence/app/tag/tag.repository";

export const TagRepoProvider: Provider = {
    provide: TAG_REPOSITORY,
    useFactory: () => {
        const connectionManager = getConnectionManager();
        const manager: Connection = connectionManager.get('default');
        return manager.getCustomRepository(TagRepositoryImpl);
    },
    inject: [Connection]
}