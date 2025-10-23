import { Product } from "../../models/product";
import { GetProductByIdUseCase } from "../useCases/GetProductByIdUseCase";
import { HttpResponse, IGetProductByIdController } from "./protocols";

export class GetProductByIdController implements IGetProductByIdController {
    constructor(private getProductByIdUseCase: GetProductByIdUseCase) {}

    async handle(id: string): Promise<HttpResponse<Product>> {
       try {
        const product = await this.getProductByIdUseCase.execute(id);
        return {
            statusCode: 200,
            body: product,
        }
       } catch (error) {
           return {
               statusCode: 404,
               body: 'Product not found',
           };
       }

    }
}