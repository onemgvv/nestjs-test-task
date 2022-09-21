import UserEntity from "@persistence/app/user/user.entity";

export default class CreatorModel {
    private nickname: string;
    private uid: string;

    set Nickname(value: string) { this.nickname = value; }
    get Nickname(): string { return this.nickname; }

    set UId(value: string) { this.uid = value; }
    get UId(): string { return this.uid; }

    static toModel(user: UserEntity) {
        const model = new CreatorModel();
        model.Nickname = user.nickname;
        model.UId = user.id;

        return model;
    }
}