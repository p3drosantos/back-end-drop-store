import { Product, UpdateProductDTO } from "../../models/product";
import { UpdateProductUseCase } from "../useCases/UpdateProductUseCase";
import { HttpResponse, IUpdateProductController } from "./protocols";

export class UpdateProductController implements IUpdateProductController {
    constructor(private updateProductUseCase: UpdateProductUseCase) {}

    async handle(id: string, data: Partial<UpdateProductDTO> & { imageFileNames?: string[], imageFileTypes?: string[] })
    : Promise<HttpResponse<{ product: Product, uploadUrls?: string[] }>> {
        try {
            const { product, uploadUrls } = await this.updateProductUseCase.execute(id, data);

            if (!product) {
                return {
                    statusCode: 404,
                    body: "Product not found"
                };
            }
            return {
                statusCode: 200,
                body: { product, uploadUrls }
            };
        } catch (error: any) {
            console.error(error);
            return {
                statusCode: 500,
                body: "Error updating product"
            };
        }
    }
}
