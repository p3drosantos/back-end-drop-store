import { IGetProductsRepository } from "../repositories/protocols";
import { Product } from "../../models/product";

export class GetProductsUseCase {
    constructor(private productsRepository: IGetProductsRepository) {}

    async execute(): Promise<Product[]> {
        const products = await this.productsRepository.findAll();
        return products;
    }
}