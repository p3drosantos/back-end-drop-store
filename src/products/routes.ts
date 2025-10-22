import { Router } from "express";
import { GetProductsRepositoryPostgres } from "./repositories/GetProductsRepositoryPostgres";
import { GetProductsUseCase } from "./useCases/GetProductsUseCase";
import { GetProductsController } from "./controllers/GetProductsController";

const productsRoutes = Router();

productsRoutes.get("/", async (req, res) => {
    const getProductsRepositoryPostgres = new GetProductsRepositoryPostgres();
    const getProductsUseCase = new GetProductsUseCase(getProductsRepositoryPostgres);
    const getProductsController = new GetProductsController(getProductsUseCase);
    
    const {statusCode, body} = await getProductsController.handle( );
    res.status(statusCode).json(body);
})




export { productsRoutes };