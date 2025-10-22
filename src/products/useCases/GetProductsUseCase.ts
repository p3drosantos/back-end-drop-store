import { IGetProductsRepository, Product } from "../repositories/IGetProductsRepository";

export class GetProductsUseCase {
    constructor(private productsRepository: IGetProductsRepository) {}

    async execute(): Promise<Product[]> {
        const products = await this.productsRepository.findAll();
        return products;
    }
}