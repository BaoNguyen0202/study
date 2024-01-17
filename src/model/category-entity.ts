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
}
