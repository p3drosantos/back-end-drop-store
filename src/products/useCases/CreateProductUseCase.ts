import { CreateProductParams, Product } from "../../models/product";
import { generatePresignedUrl } from "../../services/s3Service";
import { ICreateProductRepository } from "../repositories/protocols";
import slugify from "slugify";

export class CreateProductUseCase {
    constructor(private createProductRepository: ICreateProductRepository) {}

    async execute(data: CreateProductParams): Promise<{ product: Product ; uploadUrl: string } > {
        const slug = slugify(data.name, { lower: true, strict: true });
         const { uploadUrl, fileUrl } = await generatePresignedUrl(data.imageFileName, data.imageFileType);
         const product = await this.createProductRepository.create({
             ...data,
             slug,
             imageUrls: [fileUrl],
         });
         return { product, uploadUrl };
    }
}
