import CreatorModel from "@domain/app/tag/creator.model";
import TagModel from "@domain/app/tag/tag.model";

export interface ITagResponse {
    creator: CreatorModel,
    name: string,
    sortOrder: number,
}

export interface IUserResponse {
    email: string;
    nickname: string;
    tags: TagModel[];
}