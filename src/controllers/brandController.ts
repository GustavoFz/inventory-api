import { PrismaClient } from "@prisma/client"
import { Request, Response } from "express"

const prisma = new PrismaClient()

async function create(req: Request, res: Response) {
    try {
        const { name } = req.body

        const brand = await prisma.brand.create({
            data: {
                name
            }
        })

        return res.status(200).json(brand)

    } catch (err) {
        return res.status(404).json({ error: err })
    }
}

async function update(req: Request, res: Response) {
    try {
        const { id, name } = req.body

        const brand = await prisma.brand.update({
            where: {
                id
            },
            data: {
                name
            }
        })

        return res.status(200).json(brand)

    } catch (err) {
        return res.status(404).json({ error: err })
    }
}

async function getAll(req: Request, res: Response) {
    try {
        const brand = await prisma.brand.findMany()

        return res.status(200).json(brand)

    } catch (err) {
        return res.status(400).json({ error: err })
    }
}

async function getOne(req: Request, res: Response) {
    try {
        const id = req.params.id;

        const brand = await prisma.brand.findFirst({
            where: { id: id }
        })

        return res.status(200).json(brand)

    } catch (err) {
        return res.status(400).json({ error: err })
    }
}

async function deleteOne(req: Request, res: Response) {
    try {
        const { id } = req.params
        const brand = await prisma.brand.delete({
            where: {
                id: id
            }
        })

        return res.status(200).json(brand);

    } catch (err) {
        return res.status(404).json({ error: err })
    }
}

async function getBradByProduct(req: Request, res: Response) {
    try {
        const brandId = req.params.id
        const product = await prisma.product.findMany({
            where: {
                brandId
            }
        })

        return res.status(200).json(product)

    } catch (err) {
        return res.status(400).json({ error: err })
    }
}

export {
    create,
    update,
    getAll,
    getOne,
    deleteOne,
    getBradByProduct,
}
