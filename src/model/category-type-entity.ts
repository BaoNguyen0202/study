import { BaseEntity } from "./base-entity";
import { SearchEntity } from "./search-entity";

export class CategoryTypeEntity extends BaseEntity {
    code?: string | null;
    hashtag?: string | null;
    name?: boolean | null;
    image?: boolean | null;
    status?: number | null;
}

export class CategoryTypeEntitySearch extends SearchEntity {
}
