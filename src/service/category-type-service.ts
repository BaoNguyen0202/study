import axios, { AxiosResponse } from 'axios';
import { CONFIG_URL } from '../config/configuration';
import { ResponseAPI } from '../model/response-api';
import { CategoryTypeEntity, CategoryTypeEntitySearch } from '../model/category-type-entity';

export class CategoryTypeService {

    getList = async (request: CategoryTypeEntitySearch): Promise<AxiosResponse<ResponseAPI<CategoryTypeEntity[]>> | undefined | null> => {
        try {
            return await axios.post<ResponseAPI<CategoryTypeEntity[]>>(CONFIG_URL.API + 'CategoryType/get-by-request', request);
        } catch (error) {
            console.error('Error:', error);
        }
    };
}