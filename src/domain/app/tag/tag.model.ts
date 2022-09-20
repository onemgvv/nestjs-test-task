import CreatorModel from "@domain/app/tag/creator.model";
import {TagEntity} from "@persistence/app/tag/tag.entity";

export default class TagModel {
    private _id: number;
    private _creator: CreatorModel;
    private _name: string;
    private _sortOrder: number;

    set uid(value: number) { this._id = value; }
    get uid(): number { return this._id; }

    set creator(value: CreatorModel) { this._creator = value; }
    get creator(): CreatorModel { return this._creator; }

    set name(value: string) { this._name = value; }
    get name(): string { return this._name; }

    set sortOrder(value: number) { this._sortOrder = value; }
    get sortOrder(): number { return this._sortOrder; }

    static toModel(tag: TagEntity) {
        const model = new TagModel();
        model.uid = tag.id;
        model.creator = CreatorModel.toModel(tag.user);
        model.name = tag.name;
        model.sortOrder = tag.sortOrder;

        return model;
    }
}