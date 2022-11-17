import { Router } from "express";
import { createUser, getAllUsers, getOneUser, getUserByToken } from "../controllers/userController";
import { validateSchema } from "../middlewares/validationRequestMiddleware";
import { addUserSchema } from "../validations/userValidationScheme";

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