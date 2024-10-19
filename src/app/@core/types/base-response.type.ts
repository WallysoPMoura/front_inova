export type BaseResponse<T> = {
    success: boolean;
    data: T;
}

export type BasePaginateResponse<T> = {
    success: boolean;
    data: {
        data: T[]
        page: number,
        perPage: number,
        total: number
    };
}