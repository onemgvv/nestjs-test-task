import UserModel from "@domain/app/user/user.model";
import Tokens from "./tokens.interface";
import TokenModel from "@domain/app/token/token.model";
import UserEntity from "@persistence/app/user/user.entity";

export interface TokenService {
    /**
     *
     * Validate token
     *
     * @param token
     * @return Promise<UserModel>
     *
     */
    validateToken(token: string): UserEntity;

    /**
     *
     * Create new Access & Refresh tokens
     *
     * @param {UserModel} user
     * @return Promise<Tokens>
     *
     */
    createTokens(user: UserModel): Tokens;

    /**
     *
     * Save token to DB
     *
     * @param {string} id
     * @param {string} token
     * @return Promise<TokenModel>
     *
     */
    saveToken(id: string, token: string): Promise<TokenModel>;
}