import axios, { AxiosResponse } from 'axios';
import { CONFIG_URL } from '../config/configuration';
import { ResponseAPI } from '../model/response-api';
import { CategoryEntity, CategoryEntitySearch } from '../model/category-entity';
import { FavoriteCategoryEntity } from '../model/favorite-category-entity';

export class CategoryService {
    getList = async (request: CategoryEntitySearch): Promise<AxiosResponse<ResponseAPI<CategoryEntity>> | undefined | null> => {
        try {
            return await axios.post<ResponseAPI<CategoryEntity>>(CONFIG_URL.API + 'Category/get-by-request', request);
        } catch (error) {
            console.error('Error:', error);
        }
    };

    addToFavorite = async (request: FavoriteCategoryEntity): Promise<AxiosResponse<ResponseAPI<FavoriteCategoryEntity>> | undefined | null> => {
        try {
            return await axios.post<ResponseAPI<FavoriteCategoryEntity>>(CONFIG_URL.API + 'FavoriteCategory', request);
        } catch (error) {
            console.error('Error:', error);
        }
    };

    deleteFavorite = async (id: any): Promise<AxiosResponse<ResponseAPI<FavoriteCategoryEntity>> | undefined | null> => {
        try {
            return await axios.delete<ResponseAPI<FavoriteCategoryEntity>>(CONFIG_URL.API + `FavoriteCategory/${id}`);
        } catch (error) {
            console.error('Error:', error);
        }
    };
}