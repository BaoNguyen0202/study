import axios, { AxiosResponse } from 'axios';
import { CONFIG_URL } from '../config/configuration';
import { ResponseAPI } from '../model/response-api';

export class BaseService<TRequest, TResponse> {

    URL: string = '';
    endPoint: string = '';

    constructor(
        endPoint: string,
    ) {
        this.URL = CONFIG_URL.API;
        this.endPoint = endPoint;
    }

    getAsync = async (): Promise<AxiosResponse<ResponseAPI<TResponse>> | undefined | null> => {
        try {
            return await axios.get<ResponseAPI<TResponse>>(this.URL + this.endPoint);
        } catch (error) {
            console.error('Error:', error);
        }
    };

    searchAsync = async (request: TRequest): Promise<AxiosResponse<ResponseAPI<TResponse>> | undefined | null> => {
        try {
            return await axios.post<ResponseAPI<TResponse>>(this.URL + this.endPoint, request);
        } catch (error) {
            console.error('Error:', error);
        }
    };

    postAsync = async (request: TRequest): Promise<AxiosResponse<ResponseAPI<TResponse>> | undefined | null> => {
        try {
            return await axios.post<ResponseAPI<TResponse>>(this.URL + this.endPoint, request);
        } catch (error) {
            console.error('Error:', error);
        }
    };

    putAsync = async (request: TRequest): Promise<AxiosResponse<ResponseAPI<TResponse>> | undefined | null> => {
        try {
            return await axios.put<ResponseAPI<TResponse>>(this.URL + this.endPoint, request);
        } catch (error) {
            console.error('Error:', error);
        }
    };

    deleteAsync = async (): Promise<AxiosResponse<ResponseAPI<TResponse>> | undefined> => {
        try {
            return await axios.delete<ResponseAPI<TResponse>>(this.URL + this.endPoint);
        } catch (error) {
            console.error('Error:', error);
        }
    };
}