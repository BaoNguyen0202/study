import { BaseEntity } from "./base-entity";

export class CustomerEntity extends BaseEntity {
    code?: string | null;
    fullName?: string | null;
    birth?: Date | null;
    address?: string | null;
    gender?: number | null;
    userId?: string | null;
}