import { Router } from "express";
import {
    createProduct,
    deleteProduct,
    getAllProducts,
    getOneProduct,
    getProductsByGroup,
    updateProduct
} from "../controllers/productController";

const productRouter = Router();

productRouter
    .route('/product')
    .post(createProduct)
    .get(getAllProducts)

productRouter
    .route('/product/:id')
    .put(updateProduct)
    .get(getOneProduct)
    .delete(deleteProduct)

productRouter
    .route('/productsByGroup/:id')
    .get(getProductsByGroup)

export default productRouter;