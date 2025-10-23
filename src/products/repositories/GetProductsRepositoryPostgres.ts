
import { IGetProductsRepository } from "././protocols";
import { Product } from "../../models/product";
import {prisma} from '../../prisma'


export class GetProductsRepositoryPostgres implements IGetProductsRepository {
    async findAll(): Promise<Product[]> {
        const products = await prisma.product.findMany();
         const serializedProducts = products.map(product => ({
            ...product,
            basePrice: Number(product.basePrice),
        }));

        return serializedProducts;
    }

}