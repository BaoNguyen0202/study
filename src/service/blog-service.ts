import axios, { AxiosResponse } from 'axios';
import { CONFIG_URL } from '../config/configuration';
import { ResponseAPI } from '../model/response-api';
import { BlogEntity, BlogEntitySearch } from '../model/blog-entity';
import { RatingBlogEntity } from '../model/rating-blog-entity';

export class BlogService {

    getList = async (request: BlogEntitySearch): Promise<AxiosResponse<ResponseAPI<BlogEntity[]>> | undefined | null> => {
        try {
            return await axios.post<ResponseAPI<BlogEntity[]>>(CONFIG_URL.API + 'Blog/get-by-request', request);
        } catch (error) {
            console.error('Error:', error);
        }
    };
}