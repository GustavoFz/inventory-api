import { PrismaClient } from "@prisma/client"
import { Request, Response } from "express"

const prisma = new PrismaClient()

async function createTransaction(req: Request, res: Response) {

    const { productId, value, type } = req.body
    const transaction = await prisma.transaction.create({
        data: {
            productId,
            value,
            type
        }
    })

    return res.status(200).json(transaction)
}

async function getAllTransactionsInput(req: Request, res: Response) {
    const transaction = await prisma.transaction.findMany({
        where: { type: 'entrada' }
    })

    return res.status(200).json(transaction)
}

async function getAllTransactionsOutput(req: Request, res: Response) {
    const transaction = await prisma.transaction.findMany({
        where: { type: 'saida' }
    })

    return res.status(200).json(transaction)
}

async function getTransactionsById(req: Request, res: Response) {
    const id = req.params.id;

    const transaction = await prisma.transaction.findMany({
        where: { productId: id }
    })

    return res.status(200).json(transaction)
}

async function getBalance(req: Request, res: Response) {
    const products = await prisma.product.findMany()

    // const input = await prisma.transaction.findMany({
    //     where: { type: 'entrada' }
    // })
    // const output = await prisma.transaction.findMany({
    //     where: { type: 'saida' }
    // })

    const balance = await prisma.transaction.groupBy({
        by: ['productId', 'type'],
        _sum: {
            value: true
        }
    })

    const newArray: { productId: string; productName: string; value: number; }[] = [];

    products.map((product) => {
        const input = balance
            .filter((balance) => (balance.productId === product.id) && (balance.type === 'entrada'))
            .map((input) => Number(input._sum.value))
            .reduce((acc, cur) => acc + cur, 0);

        const output = balance
            .filter((balance) => (balance.productId === product.id) && (balance.type === 'saida'))
            .map((input) => Number(input._sum.value))
            .reduce((acc, cur) => acc + cur, 0);

        const total = Number(input) - Number(output);

        newArray.push({
            productId: product.id,
            productName: product.name,
            value: total,
        });
    });

    return res.status(200).json(newArray)
}

export {
    createTransaction,
    getAllTransactionsInput,
    getAllTransactionsOutput,
    getTransactionsById,
    getBalance,
}
