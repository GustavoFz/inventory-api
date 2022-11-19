require('dotenv').config();
import cors from 'cors';
import express from 'express';
import morgan from 'morgan';

import authRouter from './auth/authRouter';
import brandRouter from './brand/brandRouter';
import groupRouter from './group/groupRouter';
import authMiddleware from './middlewares/authMiddleware';
import productRouter from './product/productRoutes';
import subgroupRouter from './subgroup/subgroupRouter';
import transactionRouter from './transaction/transactionRouter';
import userRouter from './user/userRouter';

const app = express();

app.use(morgan('dev'));
app.use(cors())
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Public routes
app.use(authRouter)

// Middlewares
app.use(authMiddleware)

// Private routes
app.use(userRouter)
app.use(transactionRouter)
app.use(productRouter)
app.use(groupRouter)
app.use(subgroupRouter)
app.use(brandRouter)

app.listen(3001, () => console.log("Server is running on port 3001"));