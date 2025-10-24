import { IDeleteProductRepository } from "../repositories/protocols";

export class DeleteProductUseCase {
    constructor(private deleteProductRepository: IDeleteProductRepository) {}

    async execute(id: string) {
        const product = await this.deleteProductRepository.delete(id);
        return product;
    }
}