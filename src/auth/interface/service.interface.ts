import UserEntity from '@persistence/app/user/user.entity';
import IRegister from '@auth/interface/register.interface';
import ILogin from '@auth/interface/login.interface';
import IApiResponse from '@common/interface/api-response.interface';
import JwtPayload from '@auth/interface/jwt-payload.interface';

export interface AuthService {
  /**
   *
   * Validate User by Payload {email}
   *
   * @param payload
   * @return {Promise<UserEntity>}
   */
  validateUser(payload: JwtPayload): Promise<UserEntity>;

  /**
   *
   * Register new user
   *
   * @param data
   * @return {ApiResponse}
   */
  register(data: IRegister): Promise<IApiResponse>;

  /**
   *
   * Login User in account
   *
   * @param data
   * @return {ApiResponse}
   */
  login(data: ILogin): Promise<IApiResponse>;
}