import { CreateProductParams, Product } from "../../models/product";

export interface IGetProductsRepository {
  findAll(): Promise<Product[]>;
}

export interface IGetProductByIdRepository {
  findById(id: string): Promise<Product | null>;
}

export interface IDeleteProductRepository {
  delete(id: string): Promise<Product | null>;
}

export interface IUpdateProductRepository {
  findById(id: string): Promise<Product | null>;
  update(id: string, data: Partial<Product>): Promise<Product | null>;
}

export interface ICreateProductRepository {
  create(data: CreateProductParams): Promise<Product>;
}