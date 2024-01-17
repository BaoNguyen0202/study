import axios, { AxiosResponse } from 'axios';
import { CONFIG_URL } from '../config/configuration';
import { ResponseAPI } from '../model/response-api';
import { RatingBlogEntity, RatingBlogEntitySearch } from '../model/rating-blog-entity';
import { FavoriteCategoryEntity } from '../model/favorite-category-entity';

export class RatingBlogService {
    getList = async (request: RatingBlogEntitySearch): Promise<AxiosResponse<ResponseAPI<RatingBlogEntity>> | undefined | null> => {
        try {
            return await axios.post<ResponseAPI<RatingBlogEntity>>(CONFIG_URL.API + 'RatingBlog/get-by-request', request);
        } catch (error) {
            console.error('Error:', error);
        }
    };

    addComment = async (request: RatingBlogEntity): Promise<AxiosResponse<ResponseAPI<RatingBlogEntity>> | undefined | null> => {
        try {
            return await axios.post<ResponseAPI<FavoriteCategoryEntity>>(CONFIG_URL.API + 'RatingBlog', request);
        } catch (error) {
            console.error('Error:', error);
        }
    };

    deleteComment = async (id: any): Promise<AxiosResponse<ResponseAPI<RatingBlogEntity>> | undefined | null> => {
        try {
            return await axios.delete<ResponseAPI<RatingBlogEntity>>(CONFIG_URL.API + `RatingBlog/${id}`);
        } catch (error) {
            console.error('Error:', error);
        }
    };
}