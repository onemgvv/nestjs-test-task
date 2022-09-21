import { Module } from '@nestjs/common';
import {Mapper} from "@utils/mapper.util";

@Module({
    providers: [Mapper],
    exports: [Mapper],
})
export class UtilsModule {}
