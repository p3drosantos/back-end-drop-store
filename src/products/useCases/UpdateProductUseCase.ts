import { Product, UpdateProductDTO } from "../../models/product";
import { IUpdateProductRepository } from "../repositories/protocols";
import { generatePresignedUrl } from "../../services/s3Service";
import slugify from "slugify";

export class UpdateProductUseCase {
    constructor(private updateProductRepository: IUpdateProductRepository) {}

async execute(
  id: string,
  data: Partial<UpdateProductDTO> & { imageFileNames?: string[], imageFileTypes?: string[] }
) {
  let uploadUrls: string[] = [];
  let newImageUrls: string[] = [];

  // Se vier novas imagens, gera URLs do S3
  if (data.imageFileNames && data.imageFileTypes && data.imageFileNames.length === data.imageFileTypes.length) {
    for (let i = 0; i < data.imageFileNames.length; i++) {
      const { uploadUrl, fileUrl } = await generatePresignedUrl(
        data.imageFileNames[i],
        data.imageFileTypes[i]
      );
      uploadUrls.push(uploadUrl);
      newImageUrls.push(fileUrl);
    }
  }

  // Buscar produto atual para pegar as imagens antigas
  const existingProduct = await this.updateProductRepository.findById(id) as Product | null;
  if (!existingProduct) throw new Error("Produto não encontrado");

  // Mantém imagens antigas e adiciona novas
  const combinedImageUrls = (existingProduct.imageUrls ?? []).concat(newImageUrls);

  // Monta objeto que vai pro banco
  const updateData: Partial<Product> = {
    name: data.name,
    description: data.description,
    basePrice: data.basePrice,
    categoryId: data.categoryId,
    discountPercentage: data.discountPercentage,
    slug: data.name ? slugify(data.name, { lower: true, strict: true }) : undefined,
    imageUrls: combinedImageUrls.length > 0 ? combinedImageUrls : undefined
  };

  // Remove campos undefined
  Object.keys(updateData).forEach(
    key => updateData[key as keyof Product] === undefined && delete updateData[key as keyof Product]
  );

  const product = await this.updateProductRepository.update(id, updateData);

  return { product, uploadUrls };
}


}
