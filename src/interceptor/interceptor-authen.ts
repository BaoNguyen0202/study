import axios, { AxiosError } from 'axios';
import { CONFIG_URL } from '../config/configuration';

const api = axios.create({
    baseURL: CONFIG_URL.API,
});

api.interceptors.response.use(
    (response) => {
        return response;
    },
    (error: AxiosError) => {
        if (error.response && error.response.status === 401) {
            // Handle 401 Unauthorized error, for example, redirect to login page or show an alert
            // You can also redirect to the login screen or take appropriate action
        }
        return Promise.reject(error);
    }
);

export default api;