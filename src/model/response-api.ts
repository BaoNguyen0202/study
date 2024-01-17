import { STATUS_REPONSE_API } from '../config/configuration';
import { PageInfo } from './page-info';

export class ResponseAPI<T> {
    status?: STATUS_REPONSE_API;
    message?: number;
    data?: T;
    pageInfo?: PageInfo;
    code?: string;
}
