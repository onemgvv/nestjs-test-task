import {TagEntity} from "@persistence/app/tag/tag.entity";

export default class UserTagsModel {
    private id: number;
    private name: string;
    private sortOrder: number;

    set UId(value: number) { this.id = value; }
    get UId(): number { return this.id; }

    set Name(value: string) { this.name = value; }
    get Name(): string { return this.name; }

    set SortOrder(value: number) { this.sortOrder = value; }
    get SortOrder(): number { return this.sortOrder; }

    static toModel(tag: TagEntity) {
        const model = new UserTagsModel();
        model.UId = tag.id;
        model.Name = tag.name;
        model.SortOrder = tag.sortOrder;

        return model;
    }
}