import { BaseEntity } from "./base-entity";
import { CategoryEntity } from "./category-entity";
import { SearchEntity } from "./search-entity";
import { UserAccountEntity } from "./user-account-entity";

export class BlogEntity extends BaseEntity {
    code?: string | null;
    name?: string | null;
    title?: string | null;
    userAccountId?: string | null;
    userAccount?: UserAccountEntity | null;
    content?: string | null;
    poster?: string | null;
    hashtag?: string | null;
    isIncognito?: boolean | null;
    incognitoName?: boolean | null;
    categoryId?: string | null;
    category?: CategoryEntity | null;
    status?: number | null;
    type?: number | null;
    isShown?: boolean;
    fileBase64?: string | null;
    path?: string | null;
    reason?: string | null;
}

export class BlogEntitySearch extends SearchEntity {
}

export class UserBlogEntity extends BaseEntity {
    code?: string | null;
    name?: string | null;
    title?: string | null;
    userAccountId?: string | null;
    userName?: string | null;
    fullName?: string | null;
    avatar?: string | null;
    content?: string | null;
    poster?: string | null;
    hashtag?: string | null;
    isIncognito?: boolean | null;
    incognitoName?: string | null;
    categoryId?: string | null;
    categoryName?: string | null;
    status?: number | null;
    type?: number | null;
    isShown?: boolean;
    fileBase64?: string | null;
    path?: string | null;
    reason?: string | null;
    selected?: boolean | null;
    totalLike?: number | null;
    totalComment?: number | null;
}

export class UserBlogEntitySearch extends SearchEntity {
    userAccountId?: string | null;
    type?: number | null;
    categoryTypeIds?: string[] | null;
}