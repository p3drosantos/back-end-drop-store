import { Product } from "../../models/product";

export interface IGetProductsController {
    handle(): Promise<HttpResponse<Product[]>>; 
}

export interface IGetProductByIdController {
    handle(id: string) : Promise<HttpResponse<Product >>;
}   

export interface IDeleteProductController {
    handle(id: string) : Promise<HttpResponse<Product>>;
}

export interface HttpResponse<T> {
    statusCode: number;
    body: T | string | null;
}