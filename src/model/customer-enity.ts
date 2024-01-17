import { BaseEntity } from "./base-entity";
import { SearchEntity } from "./search-entity";
import { UserAccountEntity } from "./user-account-entity";

export class CustomerEntity extends BaseEntity {
    code?: string | null;
    fullName?: string | null;
    birth?: Date | null;
    address?: string | null;
    gender?: number | null;
    userId?: string | null;
    userAccount?: UserAccountEntity | null;
}

export class CustomerEntitySearch extends SearchEntity {
    code?: string | null;
    fullName?: string | null;
    birth?: Date | null;
    address?: string | null;
    gender?: number | null;
    userId?: string | null;
}