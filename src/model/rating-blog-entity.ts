import { BaseEntity } from "./base-entity";
import { BlogEntity } from "./blog-entity";
import { SearchEntity } from "./search-entity";
import { UserAccountEntity } from "./user-account-entity";


export class RatingBlogEntity extends BaseEntity {
    blogId?: string | null;
    blog?: BlogEntity | null;
    userAccountId?: string | null;
    userAccount?: UserAccountEntity | null;
    comment?: string | null;
    isLike?: boolean | null;
    type?: number | null;
    fileBase64?: string | null;
    path?: string | null;
    isIncognito?: boolean | null;
    incognitoName?: string | null;
    reason?: string | null;
    displayName?: string | null;
    canDelete?: boolean | null;
    status?: number | null;
}


export class RatingBlogEntitySearch extends SearchEntity {
    blogId?: string | null;
    userAccountId?: string | null;
}