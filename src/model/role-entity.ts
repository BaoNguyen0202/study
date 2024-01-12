import { BaseEntity } from "./base-entity";

export class RoleEntity extends BaseEntity {
    code!: string | null;
    name!: string | null;
    isActive!: boolean | null;
    isAdmin!: boolean | null;
}
