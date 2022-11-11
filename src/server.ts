
import cors from 'cors';
import express from 'express';
import morgan from 'morgan';
import groupRouter from './routes/groupRouter';
import productRouter from './routes/productRoutes';
import subgroupRouter from './routes/subgroupRouter';
import transactionRouter from './routes/transactionRouter';

const app = express();

app.use(morgan('dev'));
app.use(cors())
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(transactionRouter)
app.use(productRouter)
app.use(groupRouter)
app.use(subgroupRouter)

app.listen(3001, () => console.log("Server is running on port 3001"));