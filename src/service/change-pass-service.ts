import axios, { AxiosResponse } from 'axios';
import { CONFIG_URL } from '../config/configuration';
import { ResponseAPI } from '../model/response-api';
import { UserAccountChangePassWord, UserAccountLoginEntity } from '../model/user-account-entity';

export class ChangePass {
    changePass = async (request: UserAccountChangePassWord): Promise<AxiosResponse<ResponseAPI<UserAccountChangePassWord>> | undefined | null> => {
        try {
            const url = `${CONFIG_URL.API}UserAccount/change-pass`;
            return await axios.post<ResponseAPI<UserAccountChangePassWord>>(url, request);
        } catch (error) {
            console.error('Error:', error);
        }

    }
}