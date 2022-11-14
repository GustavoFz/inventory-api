import { Router } from "express";
import {
    createProduct,
    deleteProduct,
    getAllProducts,
    getAllProductsWithSubgroup,
    getOneProduct,
    updateProduct
} from "../controllers/productController";
import authMiddleware from "../middlewares/auth";

const productRouter = Router();

productRouter
    .route('/product')
    .post(createProduct)
    .get(getAllProducts)

productRouter.use(authMiddleware)
productRouter
    .route('/product/:id')
    .put(updateProduct)
    .get(getOneProduct)
    .delete(deleteProduct)

productRouter
    .route('/productWithSubgroup')
    .get(getAllProductsWithSubgroup)

export default productRouter;