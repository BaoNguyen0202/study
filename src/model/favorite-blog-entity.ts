import { BaseEntity } from "./base-entity";
import { BlogEntity } from "./blog-entity";
import { SearchEntity } from "./search-entity";
import { UserAccountEntity } from "./user-account-entity";

export class FavoriteBlogEntity extends BaseEntity {
    userAccountId?: string | null;
    blogId?: string | null;
    status?: number | null;
    userAccount?: UserAccountEntity | null;
    blog?: BlogEntity | null;
}

export class FavoriteBlogEntitySearch extends SearchEntity {
}
