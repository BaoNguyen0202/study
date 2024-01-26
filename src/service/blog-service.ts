import axios, { AxiosResponse } from 'axios';
import { CONFIG_URL } from '../config/configuration';
import { PaginatedList, ResponseAPI } from '../model/response-api';
import { UserBlogEntity, UserBlogEntitySearch } from '../model/blog-entity';
import { FavoriteBlogEntity } from '../model/favorite-blog-entity';

export class BlogService {

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
}