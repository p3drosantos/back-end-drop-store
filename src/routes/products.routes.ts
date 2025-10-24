import { Router } from "express";
import { GetProductsRepositoryPostgres } from "../products/repositories/GetProductsRepositoryPostgres";
import { GetProductsUseCase } from "../products/useCases/GetProductsUseCase";
import { GetProductsController } from "../products/controllers/GetProductsController";
import { prisma } from "../prisma";
import slugify from "slugify";
import { GetProductByIdUseCase } from "../products/useCases/GetProductByIdUseCase";
import { GetProductByIdController } from "../products/controllers/GetProductByIdController";
import { DeleteProductRepository } from "../products/repositories/DeleteProductRepository";
import { DeleteProductUseCase } from "../products/useCases/DeleteProductUseCase";
import { DeleteProductController } from "../products/controllers/DeleteProductController";
import { GetProductByIdRepository } from "../products/repositories/GetProductByIdRepository";


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
    const { name, description, basePrice, categoryId, discountPercentage, imageUrls } = req.body;

    if (!name || !description || !basePrice || !categoryId || !discountPercentage || !imageUrls) {
      return res.status(400).json({ error: "Campos obrigatórios faltando" });
    }

    const slug = slugify(name, { lower: true, strict: true });

    const product = await prisma.product.create({
      data: {
        name,
        slug,
        description,
        basePrice: parseFloat(basePrice),
        discountPercentage: parseFloat(discountPercentage),
        imageUrls,
        Category: { connect: { id: categoryId } }, 
      },
    });

    return res.status(201).json(product);
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




export { productsRoutes };