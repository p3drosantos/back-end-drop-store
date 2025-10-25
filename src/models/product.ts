export interface Product {
id: string;
name: string;
slug: string;
description: string;
basePrice: number;
categoryId: string;
discountPercentage: number;
imageUrls: string[];
}

export interface UpdateProductDTO {
    name?: string;
    slug?: string;
    description?: string;
    basePrice?: number;
    categoryId?: string;
    discountPercentage?: number;
    imageUrls?: string[];
}

export interface CreateProductParams {
    name: string;
    slug?: string;
    description: string;
    basePrice: number;
    categoryId: string;
    discountPercentage: number;
    imageFileName: string; // nome do arquivo que será enviado ao S3
    imageFileType: string; 
    imageUrls?: string[];
}

export interface ProductWithUploadUrl {
  product: Product;
  uploadUrl: string;
}