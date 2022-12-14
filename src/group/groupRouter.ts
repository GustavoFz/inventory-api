import { Router } from "express";
import {
    createGroup,
    deleteGroup,
    getAllGroups
} from "./groupController";

const groupRouter = Router()


groupRouter
    .route('/group')
    .post(createGroup)
    .get(getAllGroups)

groupRouter
    .route('/group/:id')
    .delete(deleteGroup)

export default groupRouter;