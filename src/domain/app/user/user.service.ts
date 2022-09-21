import {compare, hash, hashSync} from 'bcrypt';
import {Inject, Injectable} from "@nestjs/common";
import UserService from "@domain/app/user/interface/service.interface";
import {ICreateUser} from "@domain/app/user/interface/create.interface";
import {USER_REPOSITORY} from "@config/constants";
import UserRepository from '@persistence/app/user/interface/repository.interface';
import UserEntity from "@persistence/app/user/user.entity";
import {IUpdateUser} from "@domain/app/user/interface/update.interface";
import {Mapper} from "@utils/mapper.util";

const UserRepo = () => Inject(USER_REPOSITORY);

@Injectable()
export class UserServiceImpl implements UserService {
    constructor(
        @UserRepo() private userRepository: UserRepository
    ) {}

    /**
     *
     * Get all users
     *
     * @return {Promise<UserEntity[]>}
     */
    async all(): Promise<UserEntity[]> {
        const users = await this.userRepository.find();
        if(!users) return null;

        return users;
    }

    /**
     *
     * Create new user & Save him in DB
     *
     * @param dto
     * @return {Promise<UserEntity>}
     *
     */
    async create(dto: ICreateUser): Promise<UserEntity> {
        const token = await this.userRepository.save(dto);
        if(!token) return null;

        return token;
    }

    /**
     *
     * Update user
     *
     * @param {UserEntity} user
     * @param {IUpdateUser} dto
     * @return {Promise<UserEntity>}
     *
     */
    async update(user: UserEntity, dto: IUpdateUser): Promise<IUpdateUser> {
        Object.keys(Mapper.UpdateToDomain(dto)).forEach(key => {
            if(key === "password") {
                user[key] = hashSync(dto[key], 10);
            } else {
                user[key] = dto[key];
            }
        });

         await user.save();
         console.log(user);
         return { email: user.email, nickname: user.nickname }
    }

    /**
     *
     * Get user by Primary key (ID)
     *
     * @param id
     * @return {Promise<UserEntity>}
     */
    async getById(id: string): Promise<UserEntity> {
        const user = await this.userRepository.findById(id);
        if(!user) return null;

        return user;
    }

    /**
     *
     * Find user by entity key
     *
     * @param key
     * @param value
     * @return {Promise<UserEntity>}
     */
    async findOne(key: keyof UserEntity, value: any): Promise<UserEntity> {
        const user = await this.userRepository.findByField(key, value);
        if(!user) return null;

        return user;
    }

    /**
     *
     * Compare users password
     *
     * @param id
     * @param password
     * @return boolean
     */
    async comparePassword(id: string, password: string): Promise<boolean> {
        const encrypted = await this.userRepository.findById(id).then(user => user.password);
        return compare(password, encrypted);
    }

    /**
     *
     * Get user by token
     *
     * @param token
     * @return {Promise<UserEntity>}
     */
    async getByToken(token: string): Promise<UserEntity> {
        const user = await this.userRepository.findByToken(token);
        if(!user) return null;

        return user;
    }

    /**
     *
     * Check email is busy
     *
     * @param {string} email
     * @return {Promise<UserEntity>}
     */
    async isBusyEmail(email: string): Promise<boolean> {
        return !!await this.userRepository.findOne({email});
    }

    /**
     *
     * Check nickname is busy
     *
     * @param {string} nickname
     * @return {Promise<UserEntity>}
     */
    async isBusyNickname(nickname: string): Promise<boolean> {
        return !!await this.userRepository.findOne({nickname});
    }

    /**
     *
     * Delete user
     *
     * @param {string} id
     * @return {Promise<boolean>}
     */
    async remove(id: string): Promise<boolean>{
        return !!await this.userRepository.delete(id);
    }
}