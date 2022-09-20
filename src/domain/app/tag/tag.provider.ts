import { Provider } from '@nestjs/common';
import {TAG_SERVICE} from "@config/constants";
import {TagServiceImpl} from "@domain/app/tag/tag.service";

export const TagServiceProvider: Provider = {
    provide: TAG_SERVICE,
    useClass: TagServiceImpl
};