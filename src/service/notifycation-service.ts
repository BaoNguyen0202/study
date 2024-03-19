import axios, { AxiosResponse } from "axios";
import { NotifycationEntity, NotifycationEntitySearch } from "../model/notifycation-entity";
import { PaginatedList, ResponseAPI } from "../model/response-api";
import { CONFIG_URL } from "../config/configuration";


export class NotifycationService {
    getList = async (request: NotifycationEntitySearch): Promise<AxiosResponse<ResponseAPI<PaginatedList<NotifycationEntity>>> | undefined | null> => {
        try {
            return await axios.post<ResponseAPI<PaginatedList<NotifycationEntity>>>(CONFIG_URL.API + 'US_Notifycation/get-list-by-user', request);
        } catch (error) {
            console.error('Error:', error);
        }
    };

    readNotify = async (request: NotifycationEntity): Promise<AxiosResponse<ResponseAPI<NotifycationEntity>> | undefined | null> => {
        try {
            return await axios.post<ResponseAPI<NotifycationEntity>>(CONFIG_URL.API + 'US_Notifycation/read-notify', request);
        } catch (error) {
            console.error('Error:', error);
        }
    };

    getCountUnread = async (request: NotifycationEntity): Promise<AxiosResponse<ResponseAPI<number | null>> | undefined | null> => {
        try {
            return await axios.post<ResponseAPI<number | null>>(CONFIG_URL.API + 'US_Notifycation/get-count-unread-by-user', request);
        } catch (error) {
            console.error('Error:', error);
        }
    };
}