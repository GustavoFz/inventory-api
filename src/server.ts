require('dotenv').config();
import cors from 'cors';
import express from 'express';
import morgan from 'morgan';

import authMiddleware from './middlewares/authMiddleware';
import sessionRouter from './routes/authRouter';
import brandRouter from './routes/brandRouter';
import groupRouter from './routes/groupRouter';
import productRouter from './routes/productRoutes';
import subgroupRouter from './routes/subgroupRouter';
import transactionRouter from './routes/transactionRouter';
import userRouter from './routes/userRouter';

const app = express();

app.use(morgan('dev'));
app.use(cors())
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Public routes
app.use(sessionRouter)

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