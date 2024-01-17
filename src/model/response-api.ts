import { STATUS_REPONSE_API } from '../config/configuration';

export class ResponseAPI<T> {
    data?: T;
    code?: STATUS_REPONSE_API;
    message?: string | null;
    messageEX?: string | null;
}

export class PaginatedList<T> {
    items?: T[] | null;
    totalCount?: number | null;
    pageIndex?: number | null;
    pageSize?: number | null;
}
