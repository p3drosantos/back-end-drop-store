import { Router } from "express";
import { GetProductsRepositoryPostgres } from "../products/repositories/GetProductsRepositoryPostgres";
import { GetProductsUseCase } from "../products/useCases/GetProductsUseCase";
import { GetProductsController } from "../products/controllers/GetProductsController";
import { GetProductByIdUseCase } from "../products/useCases/GetProductByIdUseCase";
import { GetProductByIdController } from "../products/controllers/GetProductByIdController";
import { DeleteProductRepository } from "../products/repositories/DeleteProductRepository";
import { DeleteProductUseCase } from "../products/useCases/DeleteProductUseCase";
import { DeleteProductController } from "../products/controllers/DeleteProductController";
import { GetProductByIdRepository } from "../products/repositories/GetProductByIdRepository";
import { UpdateProductRepository } from "../products/repositories/UpdateProductRepository";
import { UpdateProductUseCase } from "../products/useCases/UpdateProductUseCase";
import { UpdateProductController } from "../products/controllers/UpdateProductController";
import { CreateProductRepository } from "../products/repositories/CreateProductRepository";
import { CreateProductUseCase } from "../products/useCases/CreateProductUseCase";
import { CreateProductController } from "../products/controllers/CreateProductController";


const productsRoutes = Router();

productsRoutes.get("/", async (req, res) => {
    const getProductsRepositoryPostgres = new GetProductsRepositoryPostgres();
    const getProductsUseCase = new GetProductsUseCase(getProductsRepositoryPostgres);
    const getProductsController = new GetProductsController(getProductsUseCase);
    
    const {statusCode, body} = await getProductsController.handle( );
    res.status(statusCode).json(body);
})

productsRoutes.get("/:id", async (req, res) => {
    const { id } = req.params;
    const getProductByIdRepository = new GetProductByIdRepository();
    const getProductByIdUseCase = new GetProductByIdUseCase(getProductByIdRepository);
    const getProductByIdController = new GetProductByIdController(getProductByIdUseCase);

    const { statusCode, body } = await getProductByIdController.handle(id);
    res.status(statusCode).json(body);
})


productsRoutes.post("/", async (req, res) => {
  try {
    const { name, description, basePrice, categoryId, discountPercentage,imageFileName,
      imageFileType, } = req.body;

    if (!name || !description || !basePrice || !categoryId || !discountPercentage || !imageFileName || !imageFileType) {
      return res.status(400).json({ error: "Campos obrigatórios faltando" });
    }

    const createProductRepository = new CreateProductRepository();
    const createProductUseCase = new CreateProductUseCase(createProductRepository);
    const createProductController = new CreateProductController(createProductUseCase);

   const { statusCode, body } = await createProductController.handle({
      name,
      description,
      basePrice: Number(basePrice),
      categoryId,
      discountPercentage: Number(discountPercentage),
      imageFileName,
      imageFileType,
    });

    res.status(statusCode).json(body);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Erro ao criar produto" });
  }


});

  productsRoutes.delete("/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const deleteProductRepository = new DeleteProductRepository();
      const deleteProductUseCase = new DeleteProductUseCase(deleteProductRepository);
      const deleteProductController = new DeleteProductController(deleteProductUseCase);
      const { statusCode, body } = await deleteProductController.handle(id);
      res.status(statusCode).json(body);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Erro ao deletar produto" });
    }
  });

productsRoutes.patch("/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const { name, description, basePrice, categoryId, discountPercentage, 
                imageFileNames, imageFileTypes } = req.body;

        const updateProductRepository = new UpdateProductRepository();
        const updateProductUseCase = new UpdateProductUseCase(updateProductRepository);
        const updateProductController = new UpdateProductController(updateProductUseCase);

        const { statusCode, body } = await updateProductController.handle(id, {
            name,
            description,
            basePrice,
            categoryId,
            discountPercentage,
            imageFileNames,
            imageFileTypes
        });

        res.status(statusCode).json(body);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Error updating product" });
    }
});




export { productsRoutes };