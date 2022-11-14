import { Router } from "express";
import { createUser, getAllUsers, getOneUser } from "../controllers/userController";

const userRouter = Router();


userRouter
    .route('/user')
    .post(createUser)
    .get(getAllUsers)

userRouter
    .route('/user/:id')
    .get(getOneUser)

export default userRouter;