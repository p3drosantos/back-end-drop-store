
import { CreateProductParams, ProductWithUploadUrl } from "../../models/product";
import { CreateProductUseCase } from "../useCases/CreateProductUseCase";
import { HttpResponse, ICreateProductController } from "./protocols";

export class CreateProductController implements ICreateProductController {
    constructor(private createProductUseCase: CreateProductUseCase) {}

    async handle(data: CreateProductParams): Promise<HttpResponse<ProductWithUploadUrl>> {
        try {
            const { product, uploadUrl } = await this.createProductUseCase.execute(data);
            
            return {
                statusCode: 201,
                body: { product, uploadUrl },
            };
        } catch (error) {
            return {
                statusCode: 500,
                body: "Internal Server Error",
            };
        }
    }
}