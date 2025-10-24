import { Product } from "../../models/product";
import { DeleteProductUseCase } from "../useCases/DeleteProductUseCase";
import { HttpResponse, IDeleteProductController } from "./protocols";

export class DeleteProductController implements IDeleteProductController {
    constructor(private deleteProductUseCase: DeleteProductUseCase) {}

    async handle(id: string): Promise<HttpResponse<Product>> {
       try {
         const product = await this.deleteProductUseCase.execute(id);
        return {
            statusCode: 200,
            body: product,
        };
       } catch (error) {
          return {
              statusCode: 500,
              body: "Internal Server Error",
          };
       }
    }
}