import { Router } from "express";
import { create, deleteOne, getAll, getSubgroupByGroup } from "../controllers/subgroupController";

const subgroupRouter = Router()


subgroupRouter
    .route('/subgroup')
    .post(create)
    .get(getAll)

subgroupRouter
    .route('/subgroup/:id')
    .delete(deleteOne)

subgroupRouter
    .route('/subgroupByGroup/:id')
    .get(getSubgroupByGroup)

export default subgroupRouter;