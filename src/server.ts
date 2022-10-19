
import cors from 'cors';
import express from 'express';
import morgan from 'morgan';
import { router } from './routes';

const app = express();

app.use(morgan('dev'));
app.use(cors())
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(router)

app.listen(3001, () => console.log("Server is running on port 3001"));