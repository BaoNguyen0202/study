import { BaseEntity } from "./base-entity";
import { CustomerEntity } from "./customer-enity";
import { RoleEntity } from "./role-entity";

export class UserAccountEntity extends BaseEntity {
    fullName?: string | null;
    address?: string | null;
    userName?: string | null;
    code?: string | null;
    image?: string | null;
    roleId?: string | null;
    email?: string | null;
    phone?: string | null;
    status?: number | null;
    role?: RoleEntity | null;
    customer?: CustomerEntity | null;
    birth?: string | null | undefined;
    userAccountId?: string | null;
    gender?: number | null;
}

export class UserAccountCategoryType {
    userAccountId?: string | null;
    categoryTypeIds?: (string | null | undefined)[];
}

export class UserAccountLoginEntity extends BaseEntity {
    userName?: string | null;
    password?: string | null;
}

export class UserAccountLoginResponseEntity extends BaseEntity {
    userName?: string | null;
    password?: string | null;
    code?: string | null;
    image?: string | null;
    email?: string | null;
    phone?: string | null;
    status?: number | null;
    token?: string | null;
    role?: RoleEntity | null;
    customer?: CustomerEntity | null;
}

export class UserAccountChangePassWord {
    id?: string | null;
    oldHashPassword?: string | null;
    newHashpassword?: string | null;
}