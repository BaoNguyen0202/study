import axios, { AxiosResponse } from 'axios';
import { CONFIG_URL } from '../config/configuration';
import { ResponseAPI } from '../model/response-api';
import { UserAccountChangePassWord, UserAccountEntity, UserAccountLoginResponseEntity, UserAccountRegisterEntity, UserAccountRegisterResponseEntity } from '../model/user-account-entity';

export class InforService {
    getInfor = async (id: string): Promise<AxiosResponse<ResponseAPI<UserAccountEntity>> | null> => {
        try {
            const url = `${CONFIG_URL.API}US_UserAccount/${id}`;
            console.log(url);

            return await axios.get<ResponseAPI<UserAccountEntity>>(url);
        } catch (error) {
            console.error('Error:', error);
            return null;
        }
    };

    updateInfor = async (request: UserAccountEntity): Promise<AxiosResponse<ResponseAPI<UserAccountLoginResponseEntity>> | undefined | null> => {

        try {
            const url = `${CONFIG_URL.API}US_UserAccount/save-user-info`;
            return await axios.post<ResponseAPI<UserAccountLoginResponseEntity>>(url, request);
        } catch (error) {
            console.error('Error:', error);
        }
    }

    changePass = async (request: UserAccountChangePassWord): Promise<AxiosResponse<ResponseAPI<UserAccountLoginResponseEntity>> | undefined | null> => {
        try {
            const url = `${CONFIG_URL.API}UserAccount/change-pass`;
            return await axios.post<ResponseAPI<UserAccountLoginResponseEntity>>(url, request);
        } catch (error) {
            console.error('Error:', error);
        }
    }

    register = async (request: UserAccountRegisterEntity): Promise<AxiosResponse<ResponseAPI<UserAccountRegisterResponseEntity>> | undefined | null> => {
        try {
            const url = `${CONFIG_URL.API}UserAccount/change-pass`;
            return await axios.post<ResponseAPI<UserAccountRegisterResponseEntity>>(url, request);
        } catch (error) {
            console.error('Error:', error);
        }
    }
}
