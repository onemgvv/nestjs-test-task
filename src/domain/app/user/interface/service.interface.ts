import UserModel from "@domain/app/user/user.model";
import {ICreateUser} from "@domain/app/user/interface/create.interface";
import UserEntity from "@persistence/app/user/user.entity";
import {IUpdateUser} from "@domain/app/user/interface/update.interface";

export default interface UserService {
    /**
     *
     * Create new user & Save him in DB
     *
     * @param dto
     * @return {Promise<UserModel>}
     *
     */
    create(dto: ICreateUser): Promise<UserModel>;

    /**
     *
     * Update user
     *
     * @param {UserEntity} user
     * @param {IUpdateUser} dto
     * @return {Promise<UserModel>}
     *
     */
    update(user: UserEntity, dto: IUpdateUser): Promise<IUpdateUser>;

    /**
     *
     * Get user by Primary key (ID)
     *
     * @param id
     * @return {Promise<UserModel>}
     */
    getById(id: string): Promise<UserModel>;

    /**
     *
     * Find user by entity key
     *
     * @param key
     * @param value
     * @return {Promise<UserEntity>}
     */
    findOne(key: keyof UserEntity, value: any): Promise<UserModel>;

    /**
     *
     * Get user by token
     *
     * @param token
     * @return {Promise<UserModel>}
     */
    getByToken(token: string): Promise<UserModel>;

    /**
     *
     * Get all users
     *
     * @return {Promise<UserModel[]>}
     */
    all(): Promise<UserModel[]>;

    /**
     *
     * Compare users password
     *
     * @param id
     * @param password
     * @return boolean
     */
    comparePassword(id: string, password: string): Promise<boolean>;

    /**
     *
     * Check email is busy
     *
     * @param {string} email
     * @return {Promise<UserModel>}
     */
    isBusyEmail(email: string): Promise<boolean>;

    /**
     *
     * Check nickname is busy
     *
     * @param {string} nickname
     * @return {Promise<UserModel>}
     */
    isBusyNickname(nickname: string): Promise<boolean>;
}