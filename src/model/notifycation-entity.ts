import { BaseEntity } from "./base-entity";
import { SearchEntity } from "./search-entity";

export class NotifycationEntity extends BaseEntity {
    userAccountId?: string | null;
    message?: string | null;
    isRead?: boolean | null;
    status?: number | null;
    type?: number | null;
}

export class NotifycationEntitySearch extends SearchEntity {
    userAccountId?: string | null;
}