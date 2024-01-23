import axios, { AxiosResponse } from 'axios';
import { CONFIG_URL } from '../config/configuration';
import { PaginatedList, ResponseAPI } from '../model/response-api';
import { FavoriteCategoryEntity } from '../model/favorite-category-entity';
import { UserCategoryEntity, UserCategoryEntitySearch } from '../model/category-entity';

export class CategoryService {
    getList = async (request: UserCategoryEntitySearch): Promise<AxiosResponse<ResponseAPI<PaginatedList<UserCategoryEntity>>> | undefined | null> => {
        try {
            return await axios.post<ResponseAPI<PaginatedList<UserCategoryEntity>>>(CONFIG_URL.API + 'US_Category/get-by-category-type-and-user', request);
        } catch (error) {
            console.error('Error:', error);
        }
    };

    saveFavoriteCategory = async (request: FavoriteCategoryEntity): Promise<AxiosResponse<ResponseAPI<FavoriteCategoryEntity>> | undefined | null> => {
        try {
            return await axios.post<ResponseAPI<FavoriteCategoryEntity>>(CONFIG_URL.API + 'US_Category/save-favorite-category', request);
        } catch (error) {
            console.error('Error:', error);
        }
    };
}