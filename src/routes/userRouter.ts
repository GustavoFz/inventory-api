import { Router } from "express";
import { createUser, getAllUsers, getOneUser, getUserByToken } from "../controllers/userController";

const userRouter = Router();


userRouter
    .route('/user')
    .post(createUser)
    .get(getAllUsers)

userRouter
    .route('/user/:id')
    .get(getOneUser)

userRouter
    .route('/userByToken/:token')
    .get(getUserByToken)

export default userRouter;