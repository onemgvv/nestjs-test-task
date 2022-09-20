import { Module } from '@nestjs/common';
import { TokenModule } from './app/token/token.module';
import { UserModule } from './app/user/user.module';
import {TagModule} from "@domain/app/tag/tag.module";

@Module({
  imports: [TokenModule, UserModule, TagModule],
  exports: [TokenModule, UserModule, TagModule]
})
export class DomainModule {}
