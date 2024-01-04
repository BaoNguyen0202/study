interface ResponseAPI<T> {
    status?: number;
    message?: number;
    data?: T;
    pageInfo?: PageInfo;
}

