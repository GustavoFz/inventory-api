import { Router } from "express";
import { create, deleteOne, getAll } from "../controllers/subgroupController";

const subgroupRouter = Router()


subgroupRouter
    .route('/subgroup')
    .post(create)
    .get(getAll)

subgroupRouter
    .route('/subgroup/id')
    .delete(deleteOne)

export default subgroupRouter;