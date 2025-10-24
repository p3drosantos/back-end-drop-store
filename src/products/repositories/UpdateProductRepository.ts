import { Product } from "../../models/product";
import { prisma } from "../../prisma";
import { IUpdateProductRepository } from "./protocols";

export class UpdateProductRepository implements IUpdateProductRepository {
    async update(id: string, data: Partial<Product>): Promise<Product | null> {
        const product = await prisma.product.update({
            where: { id },
            data,
        });
        return {
            ...product,
            basePrice: Number(product.basePrice),
        }
    }
}