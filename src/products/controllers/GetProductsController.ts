
import { Product } from "../../models/product";
import { GetProductsUseCase } from "../useCases/GetProductsUseCase";
import { HttpResponse, IGetProductsController } from "./protocols";

export class GetProductsController implements IGetProductsController {
    constructor(private getProductsUseCase: GetProductsUseCase) {}
    async handle() : Promise<HttpResponse<Product[]>> {
        try {
            const products = await this.getProductsUseCase.execute();

            return {
                statusCode: 200,
                body: products,
            };
            
        } catch (error) {
            return {
                statusCode: 500,
                body: 'Internal server error',
            };
        }
    }

}