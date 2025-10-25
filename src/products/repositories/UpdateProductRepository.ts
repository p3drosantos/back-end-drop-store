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

    async findById(id: string): Promise<Product | null> {
  const product = await prisma.product.findUnique({
    where: { id }
  });
  return product ? { ...product, basePrice: Number(product.basePrice) } : null;
}
}