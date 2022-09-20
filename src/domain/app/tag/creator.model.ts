import UserEntity from "@persistence/app/user/user.entity";

export default class CreatorModel {
    private _nickname: string;
    private _uid: string;

    set nickname(value: string) { this._nickname = value; }
    get nickname(): string { return this._nickname; }

    set uid(value: string) { this._uid = value; }
    get uid(): string { return this._uid; }

    static toModel(user: UserEntity) {
        const model = new CreatorModel();
        model.nickname = user.nickname;
        model.uid = user.id;

        return model;
    }
}