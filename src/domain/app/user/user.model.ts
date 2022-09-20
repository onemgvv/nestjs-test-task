import UserEntity from "@persistence/app/user/user.entity";

export default class UserModel {
    private _id: string;
    private _nickname: string;
    private _email: string;


    get id(): string { return this._id; }
    set id(value: string) { this._id = value; }

    get nickname(): string { return this._nickname; }
    set nickname(value: string) { this._nickname = value; }

    get email(): string { return this._email; }
    set email(value: string) { this._email = value; }

    static toModel(user: UserEntity) {
        const model = new UserModel();
        model.id = user.id;
        model.nickname = user.nickname;
        model.email = user.email;
        return model;
    }
}