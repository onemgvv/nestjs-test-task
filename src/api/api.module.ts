import { Module } from '@nestjs/common';
import { UserController } from './app/user/user.controller';
import { AuthController } from './auth/auth.controller';
import {DomainModule} from "@domain/domain.module";
import {AuthModule} from "@auth/auth.module";
import {TagController} from "@api/app/tag/tag.controller";

@Module({
  imports: [AuthModule, DomainModule],
  controllers: [UserController, AuthController, TagController]
})
export class ApiModule {}
