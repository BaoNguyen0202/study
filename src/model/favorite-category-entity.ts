import { BaseEntity } from "./base-entity";
import { CategoryEntity } from "./category-entity";
import { SearchEntity } from "./search-entity";
import { UserAccountEntity } from "./user-account-entity";

export class FavoriteCategoryEntity extends BaseEntity {
    userAccountId?: string | null;
    categoryId?: string | null;
    status?: number | null;
    userAccount?: UserAccountEntity | null;
    category?: CategoryEntity | null;
}

export class FavoriteCategoryEntitySearch extends SearchEntity {
}
