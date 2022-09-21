import {ICreateUser} from "@domain/app/user/interface/create.interface";
import UserEntity from "@persistence/app/user/user.entity";
import {IUpdateUser} from "@domain/app/user/interface/update.interface";

export default interface UserService {
    /**
     *
     * Create new user & Save him in DB
     *
     * @param dto
     * @return {Promise<UserEntity>}
     *
     */
    create(dto: ICreateUser): Promise<UserEntity>;

    /**
     *
     * Update user
     *
     * @param {UserEntity} user
     * @param {IUpdateUser} dto
     * @return {Promise<UserEntity>}
     *
     */
    update(user: UserEntity, dto: IUpdateUser): Promise<IUpdateUser>;

    /**
     *
     * Get user by Primary key (ID)
     *
     * @param id
     * @return {Promise<UserEntity>}
     */
    getById(id: string): Promise<UserEntity>;

    /**
     *
     * Find user by entity key
     *
     * @param key
     * @param value
     * @return {Promise<UserEntity>}
     */
    findOne(key: keyof UserEntity, value: any): Promise<UserEntity>;

    /**
     *
     * Get user by token
     *
     * @param token
     * @return {Promise<UserEntity>}
     */
    getByToken(token: string): Promise<UserEntity>;

    /**
     *
     * Delete user
     *
     * @param {string} id
     * @return {Promise<boolean>}
     */
    remove(id: string): Promise<boolean>;

    /**
     *
     * Get all users
     *
     * @return {Promise<UserEntity[]>}
     */
    all(): Promise<UserEntity[]>;

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
     * @return {Promise<UserEntity>}
     */
    isBusyEmail(email: string): Promise<boolean>;

    /**
     *
     * Check nickname is busy
     *
     * @param {string} nickname
     * @return {Promise<UserEntity>}
     */
    isBusyNickname(nickname: string): Promise<boolean>;
}