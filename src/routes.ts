import { PrismaClient } from "@prisma/client";
import { Request, Response, Router } from "express";

const prisma = new PrismaClient()
const router = Router();

router.post('/product', async (req: Request, res: Response) => {
    try {
        const { name, groupId } = req.body

        const product = await prisma.product.create({
            data: {
                name,
                groupId
            }
        })

        return res.status(200).json(product)

    } catch (err) {
        return res.status(404).json({ error: err })
    }
})

router.get('/product', async (req: Request, res: Response) => {
    try {
        const product = await prisma.product.findMany()

        return res.status(200).json(product)

    } catch (err) {
        return res.status(400).json({ error: err })
    }
})

router.delete('/product/:id', async (req: Request, res: Response) => {
    try {
        const { id } = req.params
        const productDelete = await prisma.product.delete({
            where: {
                id: id
            }
        })

        return res.status(200).json(productDelete);

    } catch (err) {
        return res.status(404).json({ error: err })
    }
})

router.get('/product/:id', async (req: Request, res: Response) => {
    try {
        const id = req.params.id;

        const product = await prisma.product.findFirst({
            where: { id: id }
        })

        return res.status(200).json(product)

    } catch (err) {
        return res.status(400).json({ error: err })
    }
})

router.post('/group', async (req: Request, res: Response) => {

    const { name } = req.body

    try {
        const group = await prisma.group.create({
            data: {
                name
            }
        })

        return res.status(200).json(group)

    } catch (err) {
        return res.status(404).json({ error: err })
    }
})

router.get('/group', async (req: Request, res: Response) => {
    try {

        const group = await prisma.group.findMany()

        return res.status(200).json(group)

    } catch (err) {
        return res.status(400).json({ error: err })
    }
})

router.delete('/group/:id', async (req: Request, res: Response) => {
    try {
        const { id } = req.params
        const groupDelete = await prisma.group.delete({
            where: {
                id: id
            }
        })
        return res.status(200).json(groupDelete);
    } catch (err) {
        return res.status(404).json({ error: err })
    }
})

router.post('/transaction', async (req: Request, res: Response) => {

    const { productId, value, type } = req.body

    try {
        const transaction = await prisma.transaction.create({
            data: {
                productId,
                value,
                type
            }
        })

        return res.status(200).json(transaction)

    } catch (err) {
        return res.status(404).json({ error: err })
    }
})

router.get('/transactionInput', async (req: Request, res: Response) => {
    try {

        const transaction = await prisma.transaction.findMany({
            where: { type: 'entrada' }
        })

        return res.status(200).json(transaction)

    } catch (err) {
        return res.status(400).json({ error: err })
    }
})

router.get('/transactionOutput', async (req: Request, res: Response) => {
    try {

        const transaction = await prisma.transaction.findMany({
            where: { type: 'saida' }
        })

        return res.status(200).json(transaction)

    } catch (err) {
        return res.status(400).json({ error: err })
    }
})

router.get('/transaction/:id', async (req: Request, res: Response) => {
    try {
        const id = req.params.id;

        const transaction = await prisma.transaction.findMany({
            where: { productId: id }
        })

        return res.status(200).json(transaction)

    } catch (err) {
        return res.status(400).json({ error: err })
    }
})

router.get('/productsByGroup/:id', async (req: Request, res: Response) => {
    try {
        const groupId = req.params.id
        const products = await prisma.product.findMany({
            where: {
                groupId: groupId
            }
        })

        return res.status(200).json(products)

    } catch (err) {
        return res.status(400).json({ error: err })
    }
})

router.get('/balance', async (req: Request, res: Response) => {
    try {

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

        console.log(balance)
        console.log(newArray);

        return res.status(200).json(newArray)

    } catch (err) {
        return res.status(400).json({ error: err })
    }
})

export { router };
