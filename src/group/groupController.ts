import { PrismaClient } from "@prisma/client"
import { Request, Response } from "express"

const prisma = new PrismaClient()

async function createGroup(req: Request, res: Response) {
    const { name } = req.body
    const group = await prisma.group.create({
        data: {
            name
        }
    })

    return res.status(200).json(group)
}

async function getAllGroups(req: Request, res: Response) {
    const group = await prisma.group.findMany()

    return res.status(200).json(group)
}

async function deleteGroup(req: Request, res: Response) {
    const { id } = req.params
    const groupDelete = await prisma.group.delete({
        where: {
            id: id
        }
    })
    return res.status(200).json(groupDelete);
}

export {
    createGroup,
    getAllGroups,
    deleteGroup,
}
