import { Router } from "express";
import { loginAuth, refreshAuth } from "./authController";

const authRouter = Router()

authRouter.post('/auth/login', loginAuth)
authRouter.post('/auth/refresh', refreshAuth)

export default authRouter;