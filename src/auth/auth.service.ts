import UserEntity from '@persistence/app/user/user.entity';
import { hash } from 'bcrypt';
import {
  BadRequestException,
  Inject,
  Injectable,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { AuthService } from '@auth/interface/service.interface';
import IApiResponse from '@common/interface/api-response.interface';
import UserModel from '@domain/app/user/user.model';
import IRegister from '@auth/interface/register.interface';
import JwtPayload from '@auth/interface/jwt-payload.interface';
import ILogin from '@auth/interface/login.interface';
import Tokens from '@domain/app/token/interface/tokens.interface';
import {
  AUTHORIZATION_EXCEPTION,
  SUCCESSFUL_AUTHORIZATION,
  SUCCESSFUL_REGISTER,
  TOKEN_SERVICE,
  USER_ALREADY_EXISTS,
  USER_NOT_FOUND,
  USER_SERVICE,
  USERNAME_EXIST,
} from '@config/constants';
import { TokenService } from '@domain/app/token/interface/service.interface';
import UserService from '@domain/app/user/interface/service.interface';
import { ApiResponse } from '@common/helpers/api-response.helper';

const TokenService = () => Inject(TOKEN_SERVICE);
const UserService = () => Inject(USER_SERVICE);

@Injectable()
export class AuthServiceImpl implements AuthService {
  constructor(
    @TokenService() private tokenService: TokenService,
    @UserService() private userService: UserService,
  ) {}

  /**
   *
   * Validate User by Payload {email}
   *
   * @param payload
   * @return {Promise<UserModel>}
   */
  async validateUser(payload: JwtPayload): Promise<UserEntity> {
    const { email } = payload;
    return await this.userService.findOne('email', email);
  }

  /**
   *
   * Register new user
   *
   * @param data
   * @return {Promise<IApiResponse>}
   */
  async register(data: IRegister): Promise<IApiResponse> {
    if (await this.candidateExist(data.email)) {
      throw new BadRequestException(USER_ALREADY_EXISTS);
    }

    if (await this.userService.findOne('nickname', data.nickname)) {
      throw new BadRequestException(
        USERNAME_EXIST.replace('{nickname}', data.nickname),
      );
    }

    const hashedPassword = await hash(data.password, 8);
    const user = UserModel.toModel(
      await this.userService.create({ ...data, password: hashedPassword }),
    );
    const tokens = await this.authenticate(user);
    return ApiResponse.Auth(201, SUCCESSFUL_REGISTER, { tokens, user: user });
  }

  /**
   *
   * Login User in account
   *
   * @param data
   * @return {IApiResponse}
   */
  async login(data: ILogin): Promise<IApiResponse> {
    const user = await this.candidateExist(data.email);
    if (!user) {
      throw new NotFoundException(USER_NOT_FOUND);
    }
    const isMatch = await this.userService.comparePassword(
      user.Id,
      data.password,
    );
    if (!isMatch) {
      throw new UnprocessableEntityException(AUTHORIZATION_EXCEPTION);
    }

    const tokens = await this.authenticate(user);
    return ApiResponse.Auth(200, SUCCESSFUL_AUTHORIZATION, { tokens, user });
  }

  /**
   *
   * Create new tokens
   *
   * @private
   * @param user
   * @return: {Promise<Tokens>}
   */
  private async authenticate(user: UserModel): Promise<Tokens> {
    const tokens = await this.tokenService.createTokens(user);
    await this.tokenService.saveToken(user.Id, tokens.refreshToken);
    return tokens;
  }

  /**
   *
   * Check candidate to login/register exist in system
   *
   * @private
   * @param email
   * @return {Promise<UserModel | boolean>}
   */
  private async candidateExist(email: string): Promise<UserModel> {
    const user = await this.userService.findOne('email', email);
    if (!user) return null;

    return UserModel.toModel(user);
  }
}
