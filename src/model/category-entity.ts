import { BaseEntity } from "./base-entity";
import { CategoryTypeEntity } from "./category-type-entity";
import { SearchEntity } from "./search-entity";

export class CategoryEntity extends BaseEntity {
    code?: string | null;
    hashtag?: string | null;
    name?: boolean | null;
    image?: boolean | null;
    status?: number | null;
    parentCategoryId?: string | null;
    categoryTypeId?: string | null;
    categoryType?: CategoryTypeEntity | null;
}

export class CategoryEntitySearch extends SearchEntity {
    categoryTypeId?: string | null;
    userAccountId?: string | null;
}

export class UserCategoryEntity extends BaseEntity {
    code?: string | null;
    hashtag?: string | null;
    status?: number | null;
    name?: string | null;
    image?: string | null;
    categoryTypeId?: string | null;
    userAccountId?: string | null;
    selected?: boolean | null;
    categoryType?: CategoryTypeEntity | null;
}

export class UserCategoryEntitySearch extends SearchEntity {
    userAccountId?: string | null;
    categoryTypeIds?: string[] | null;
}