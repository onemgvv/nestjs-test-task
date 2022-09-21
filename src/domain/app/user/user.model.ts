import UserEntity from "@persistence/app/user/user.entity";

export default class UserModel {
    private id: string;
    private nickname: string;
    private email: string;


    get Id(): string { return this.id; }
    set Id(value: string) { this.id = value; }

    get Nickname(): string { return this.nickname; }
    set Nickname(value: string) { this.nickname = value; }

    get Email(): string { return this.email; }
    set Email(value: string) { this.email = value; }

    static toModel(user: UserEntity) {
        const model = new UserModel();
        model.Id = user.id;
        model.Nickname = user.nickname;
        model.Email = user.email;
        return model;
    }
}