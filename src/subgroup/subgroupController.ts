import { PrismaClient } from "@prisma/client"
import { Request, Response } from "express"

const prisma = new PrismaClient()

async function create(req: Request, res: Response) {
    const { name, groupId } = req.body
    const subgroup = await prisma.subgroup.create({
        data: {
            name,
            groupId
        }
    })
    return res.status(200).json(subgroup)
}

async function update(req: Request, res: Response) {
    const { id, name, groupId } = req.body

    const subgroup = await prisma.subgroup.update({
        where: {
            id
        },
        data: {
            name,
            groupId
        }
    })

    return res.status(200).json(subgroup)
}

async function getAll(req: Request, res: Response) {
    const subgroup = await prisma.subgroup.findMany()

    return res.status(200).json(subgroup)
}

async function getOne(req: Request, res: Response) {
    const id = req.params.id;

    const subgroup = await prisma.subgroup.findFirst({
        where: { id: id }
    })

    return res.status(200).json(subgroup)
}

async function deleteOne(req: Request, res: Response) {
    const { id } = req.params
    const subgroup = await prisma.subgroup.delete({
        where: {
            id: id
        }
    })

    return res.status(200).json(subgroup);
}

async function getSubgroupByGroup(req: Request, res: Response) {
    const groupId = req.params.id
    const subgroup = await prisma.subgroup.findMany({
        where: {
            groupId
        }
    })

    return res.status(200).json(subgroup)
}

export {
    create,
    update,
    getAll,
    getOne,
    deleteOne,
    getSubgroupByGroup,
}
