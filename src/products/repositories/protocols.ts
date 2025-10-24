import { Product } from "../../models/product";

export interface IGetProductsRepository {
  findAll(): Promise<Product[]>;
}

export interface IGetProductByIdRepository {
  findById(id: string): Promise<Product | null>;
}

export interface IDeleteProductRepository {
  delete(id: string): Promise<Product | null>;
}

