import axios, { AxiosResponse } from 'axios';
import { CONFIG_URL } from '../config/configuration';
import { PaginatedList, ResponseAPI } from '../model/response-api';
import { CategoryTypeEntity, CategoryTypeEntitySearch } from '../model/category-type-entity';
import { UserAccountCategoryType } from '../model/user-account-entity';

export class CategoryTypeService {

    getList = async (request: CategoryTypeEntitySearch): Promise<AxiosResponse<ResponseAPI<PaginatedList<CategoryTypeEntity>>> | undefined | null> => {
        try {
            return await axios.post<ResponseAPI<PaginatedList<CategoryTypeEntity>>>(CONFIG_URL.API + 'US_CategoryType/get-by-request', request);
        } catch (error) {
            console.error('Error:', error);
        }
    };

    addUserCategoryType = async (request: UserAccountCategoryType): Promise<AxiosResponse<ResponseAPI<boolean>> | undefined | null> => {
        try {
            return await axios.post<ResponseAPI<boolean>>(CONFIG_URL.API + 'US_CategoryType/add-user-category-type', request);
        } catch (error) {
            console.error('Error:', error);
        }
    };
}