import { Router } from "express";
import { validateSchema } from "../middlewares/validationRequestMiddleware";
import { createUser, getAllUsers, getOneUser, getUserByToken } from "./userController";
import { addUserSchema } from "./userValidationScheme";

const userRouter = Router();

userRouter
    .route('/user')
    .post(addUserSchema, validateSchema, createUser)
    .get(getAllUsers)

userRouter
    .route('/user/:id')
    .get(getOneUser)

userRouter
    .route('/userByToken/:token')
    .get(getUserByToken)

export default userRouter;