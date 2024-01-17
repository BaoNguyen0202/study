import { BaseEntity } from "./base-entity";
import { SearchEntity } from "./search-entity";

export class RoleEntity extends BaseEntity {
    code?: string | null;
    name?: string | null;
    isActive?: boolean | null;
    isAdmin?: boolean | null;
}

export class RoleEntitySearch extends SearchEntity {
    code?: string | null;
    name?: string | null;
    isActive?: boolean | null;
    isAdmin?: boolean | null;
}