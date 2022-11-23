import { PrismaClient } from "@prisma/client"
import { Request, Response } from "express"

const prisma = new PrismaClient()

async function createProduct(req: Request, res: Response) {
    const { name, subgroupId, brandId, groupId, barCode, controlSerialNumber, serialNumber } = req.body

    const dataProduct = {
        name,
        subgroupId,
        brandId,
        groupId,
        barCode,
        controlSerialNumber
    }

    if (!controlSerialNumber) {
        const product = await prisma.product.create({
            data: dataProduct
        })
        return res.status(200).json(product)
    }

    const product = await prisma.product.create({
        data: {
            ...dataProduct,
            item: {
                create: { serialNumber }
            }
        },
        include: {
            item: {
                select: {
                    serialNumber: true
                }
            }
        }
    })
    return res.status(200).json(product)
}

async function updateProduct(req: Request, res: Response) {
    const { id } = req.params
    const { name, subgroupId, brandId, groupId, barCode } = req.body

    const data = {
        name,
        subgroupId,
        brandId,
        groupId,
        barCode
    }
    const product = await prisma.product.update({
        where: {
            id
        },
        data
    })
    return res.status(200).json(product)
}

async function getAllProducts(req: Request, res: Response) {
    const product = await prisma.product.findMany({
        include: {
            item: true,
        }
    })

    console.log(product)

    if (product === null) {
        return res.status(404).json({})
    }
    return res.status(200).json(product)
}

async function getAllProductsWithSubgroup(req: Request, res: Response) {
    const product = await prisma.product.findMany({
        include: {
            subgroup: true
        }
    })

    return res.status(200).json(product)
}

async function getOneProduct(req: Request, res: Response) {
    const id = req.params.id;

    const product = await prisma.product.findFirst({
        where: { id: id }
    })
    return res.status(200).json(product)
}

async function deleteProduct(req: Request, res: Response) {
    const { id } = req.params
    const productDelete = await prisma.product.delete({
        where: {
            id: id
        }
    })
    return res.status(200).json(productDelete);
}

async function getProductsByGroup(req: Request, res: Response) {
    const subgroupId = req.params.id
    const products = await prisma.product.findMany({
        where: {
            subgroupId
        }
    })
    return res.status(200).json(products)
}

export {
    createProduct,
    updateProduct,
    getAllProducts,
    getOneProduct,
    deleteProduct,
    getProductsByGroup,
    getAllProductsWithSubgroup,
}
