import { PrismaClient } from "@prisma/client"
import { Request, Response } from "express"

const prisma = new PrismaClient()

async function create(req: Request, res: Response) {
    const { name } = req.body

    const brand = await prisma.brand.create({
        data: {
            name
        }
    })

    return res.status(200).json(brand)
}

async function update(req: Request, res: Response) {
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
}

async function getAll(req: Request, res: Response) {
    const brand = await prisma.brand.findMany()

    return res.status(200).json(brand)
}

async function getOne(req: Request, res: Response) {
    const id = req.params.id;

    const brand = await prisma.brand.findFirst({
        where: { id: id }
    })

    return res.status(200).json(brand)
}

async function deleteOne(req: Request, res: Response) {
    const { id } = req.params
    const brand = await prisma.brand.delete({
        where: {
            id: id
        }
    })

    return res.status(200).json(brand);
}

async function getBradByProduct(req: Request, res: Response) {
    const brandId = req.params.id
    const product = await prisma.product.findMany({
        where: {
            brandId
        }
    })

    return res.status(200).json(product)
}

export {
    create,
    update,
    getAll,
    getOne,
    deleteOne,
    getBradByProduct,
}
