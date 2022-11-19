import { Router } from "express";
import {
    createTransaction,
    getAllTransactionsInput,
    getAllTransactionsOutput,
    getBalance, getTransactionsById
} from "./transactionController";

const transactionRouter = Router();

transactionRouter.route('/transaction')
    .post(createTransaction)

transactionRouter.route('/transactionInput')
    .get(getAllTransactionsInput)

transactionRouter.route('/transactionOutput')
    .get(getAllTransactionsOutput)

transactionRouter.route('/transaction/:id')
    .get(getTransactionsById)

transactionRouter.route('/balance')
    .get(getBalance)

export default transactionRouter

