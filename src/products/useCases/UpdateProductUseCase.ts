import { UpdateProductDTO } from "../../models/product";
import {  IUpdateProductRepository } from "../repositories/protocols";

export class UpdateProductUseCase {
    constructor(private updateProductRepository: IUpdateProductRepository) {}
    async execute(id: string, data: Partial<UpdateProductDTO>) {
        const product = await this.updateProductRepository.update(id, data);
        return product;
    }

}