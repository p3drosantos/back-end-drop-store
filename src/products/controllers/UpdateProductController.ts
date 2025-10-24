import { Product, UpdateProductDTO } from "../../models/product";
import { UpdateProductUseCase } from "../useCases/UpdateProductUseCase";
import { HttpResponse, IUpdateProductController } from "./protocols";

export class UpdateProductController implements IUpdateProductController {
    constructor(private updateProductUseCase: UpdateProductUseCase ) {}
    async handle(id: string, data: Partial<UpdateProductDTO>) : Promise<HttpResponse<Product>> {
        try {
            const product = await this.updateProductUseCase.execute(id, data);
            return {
                statusCode: 200,
                body: product
            }
        } catch (error) {
            return {
                statusCode: 400,
                body: "error updating product"
            };
        }
    }

}