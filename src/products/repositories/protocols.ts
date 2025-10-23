import { Product } from "../../models/product";

export interface IGetProductsRepository {
  findAll(): Promise<Product[]>;
}