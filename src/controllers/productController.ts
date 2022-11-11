import { PrismaClient } from "@prisma/client"
import { Request, Response } from "express"

const prisma = new PrismaClient()

async function createProduct(req: Request, res: Response) {
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
}

async function updateProduct(req: Request, res: Response) {
    try {
        const { id, name, groupId } = req.body

        const product = await prisma.product.update({
            where: {
                id
            },
            data: {
                name,
                groupId
            }
        })

        return res.status(200).json(product)

    } catch (err) {
        return res.status(404).json({ error: err })
    }
}

async function getAllProducts(req: Request, res: Response) {
    try {
        const product = await prisma.product.findMany()

        return res.status(200).json(product)

    } catch (err) {
        return res.status(400).json({ error: err })
    }
}

async function getOneProduct(req: Request, res: Response) {
    try {
        const id = req.params.id;

        const product = await prisma.product.findFirst({
            where: { id: id }
        })

        return res.status(200).json(product)

    } catch (err) {
        return res.status(400).json({ error: err })
    }
}

async function deleteProduct(req: Request, res: Response) {
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
}

async function getProductsByGroup(req: Request, res: Response) {
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
}

export {
    createProduct,
    updateProduct,
    getAllProducts,
    getOneProduct,
    deleteProduct,
    getProductsByGroup
}
