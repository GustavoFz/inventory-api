import { Router } from "express";
import {
    create,
    deleteOne,
    getAll,
    getBradByProduct
} from "../controllers/brandController";

const brandRouter = Router()


brandRouter
    .route('/brand')
    .post(create)
    .get(getAll)

brandRouter
    .route('/brand/:id')
    .delete(deleteOne)


brandRouter
    .route('/brandByProduct/:id')
    .get(getBradByProduct)

export default brandRouter;