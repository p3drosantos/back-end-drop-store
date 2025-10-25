import { CreateProductParams, Product, ProductWithUploadUrl } from "../../models/product";

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
export interface IUpdateProductController {
  handle(id: string, data: Partial<Product>): Promise<HttpResponse<{ product: Product; uploadUrls?: string[] }>>;
}

export interface ICreateProductController{
    handle(data: CreateProductParams): Promise<HttpResponse<ProductWithUploadUrl>>;
}