import slugify from "slugify";
import { CreateProductParams, Product } from "../../models/product";
import { ICreateProductRepository } from "./protocols";
import { prisma } from "../../prisma";

export class CreateProductRepository implements ICreateProductRepository {
    async create(data : CreateProductParams) : Promise<Product> {
        const product = await prisma.product.create({
            data: {
                name: data.name,
                slug: slugify(data.name, { lower: true, strict: true }),
                description: data.description,
                basePrice: data.basePrice,
                categoryId: data.categoryId,
                discountPercentage: data.discountPercentage,
                imageUrls: data.imageUrls,
            },
        });
        return {
            ...product,
            basePrice : Number(product.basePrice),
        }
    }
}