import axios, { AxiosResponse } from 'axios';
import { CONFIG_URL } from '../config/configuration';
import { PaginatedList, ResponseAPI } from '../model/response-api';
import { UserBlogEntity, UserBlogEntitySearch } from '../model/blog-entity';
import { FavoriteBlogEntity } from '../model/favorite-blog-entity';
import { RatingBlogEntity, RatingBlogEntitySearch } from '../model/rating-blog-entity';

export class BlogService {

    getListAllByType = async (request: UserBlogEntitySearch): Promise<AxiosResponse<ResponseAPI<PaginatedList<UserBlogEntity>>> | undefined | null> => {
        try {
            return await axios.post<ResponseAPI<PaginatedList<UserBlogEntity>>>(CONFIG_URL.API + 'US_Blog/get-list-user-blog', request);
        } catch (error) {
            console.error('Error:', error);
        }
    };

    getList = async (request: UserBlogEntitySearch): Promise<AxiosResponse<ResponseAPI<PaginatedList<UserBlogEntity>>> | undefined | null> => {
        try {
            return await axios.post<ResponseAPI<PaginatedList<UserBlogEntity>>>(CONFIG_URL.API + 'US_Blog/get-outstanding-blog', request);
        } catch (error) {
            console.error('Error:', error);
        }
    };

    saveFavoriteBlog = async (request: FavoriteBlogEntity): Promise<AxiosResponse<ResponseAPI<FavoriteBlogEntity>> | undefined | null> => {
        try {
            return await axios.post<ResponseAPI<FavoriteBlogEntity>>(CONFIG_URL.API + 'US_Blog/save-favorite-blog', request);
        } catch (error) {
            console.error('Error:', error);
        }
    };

    getListRating = async (request: RatingBlogEntitySearch): Promise<AxiosResponse<ResponseAPI<PaginatedList<RatingBlogEntity>>> | undefined | null> => {
        try {
            return await axios.post<ResponseAPI<PaginatedList<RatingBlogEntity>>>(CONFIG_URL.API + 'US_Blog/get-rating-by-blog-id', request);
        } catch (error) {
            console.error('Error:', error);
        }
    };

    addRating = async (request: RatingBlogEntity): Promise<AxiosResponse<ResponseAPI<RatingBlogEntity>> | undefined | null> => {
        try {
            return await axios.post<ResponseAPI<RatingBlogEntity>>(CONFIG_URL.API + 'US_Blog/add-rating-by-user', request);
        } catch (error) {
            console.error('Error:', error);
        }
    };

    changeTrack = async (request: UserBlogEntity, type: string): Promise<AxiosResponse<ResponseAPI<UserBlogEntity>> | undefined | null> => {
        try {
            return await axios.post<ResponseAPI<UserBlogEntity>>(CONFIG_URL.API + `US_Blog/get-${type}-blog`, request);
        } catch (error) {
            console.error('Error:', error);
        }
    };

    createBlog = async (request: UserBlogEntity): Promise<AxiosResponse<ResponseAPI<UserBlogEntity>> | undefined | null> => {
        try {
            return await axios.post<ResponseAPI<UserBlogEntity>>(CONFIG_URL.API + 'US_Blog/add-blog-by-user', request);
        } catch (error) {
            console.error('Error:', error);
        }
    };


    deleteByUser = async (request: UserBlogEntity): Promise<AxiosResponse<ResponseAPI<UserBlogEntity>> | undefined | null> => {
        try {
            return await axios.post<ResponseAPI<UserBlogEntity>>(CONFIG_URL.API + 'US_Blog/delete-blog-by-user-id', request);
        } catch (error) {
            console.error('Error:', error);
        }
    };
}