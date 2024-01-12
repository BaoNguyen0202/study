import { BaseEntity } from "./base-entity";
import { CustomerEntity } from "./customer-enity";
import { RoleEntity } from "./role-entity";

export class UserAccountEntity extends BaseEntity {
    userName?: string | null;
    hashpassword?: string | null;
    roleId?: string | null;
    phone?: string | null;
    status?: number | null;
    role?: RoleEntity | null;
    customerId?: string | null;
    customer?: CustomerEntity | null;
    token?: string | null
}


export class UserAccountLoginEntity extends BaseEntity {
    userName?: string | null;
    password?: string | null;
}