import { prisma } from "../../prisma";
import { IDeleteProductRepository } from "./protocols";

export class DeleteProductRepository implements IDeleteProductRepository {
    async delete(id: string) {
        const product = await prisma.product.delete({
            where: { id },
        });
        return {
            ...product,
            basePrice: Number(product.basePrice),
        }
    }
        
}