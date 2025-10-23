import { prisma } from "../../prisma";
import { IGetProductByIdRepository } from "./protocols";

export class GetProductByIdRepository implements IGetProductByIdRepository {
    async findById(id: string) {
        
        const product = await prisma.product.findUnique({
            where: { id }
        });

        if (!product) {
            return null;
        }

        return {
            ...product,
            basePrice: Number(product.basePrice),
        };
    }
}
