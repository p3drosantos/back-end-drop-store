
import { GetProductsUseCase } from "../useCases/GetProductsUseCase";

export class GetProductsController {
    constructor(private getProductsUseCase: GetProductsUseCase) {}
    async handle() {
        try {
            const products = await this.getProductsUseCase.execute();

            return {
                statusCode: 200,
                body: products,
            };
            
        } catch (error) {
            return {
                statusCode: 500,
                body: { message: 'Internal server error' },
            };
        }
    }

}