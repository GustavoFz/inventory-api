import { Router } from "express";
import {
    createProduct,
    deleteProduct,
    getAllProducts,
    getAllProductsWithSubgroup,
    getOneProduct,
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
    .route('/productWithSubgroup')
    .get(getAllProductsWithSubgroup)

export default productRouter;