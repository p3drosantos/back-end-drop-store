import { Product } from "../../models/product";
import { IGetProductByIdRepository } from "../repositories/protocols";

export class GetProductByIdUseCase {
    constructor(private productsRepository: IGetProductByIdRepository) {}

    async execute(id: string) : Promise<Product> {
        const product = await this.productsRepository.findById(id);
        if (!product) {
            throw new Error("Product not found");
        }
        return product;
    }
}