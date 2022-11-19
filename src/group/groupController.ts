import { PrismaClient } from "@prisma/client"
import { Request, Response } from "express"

const prisma = new PrismaClient()

async function createGroup(req: Request, res: Response) {

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
}

async function getAllGroups(req: Request, res: Response) {
    try {

        const group = await prisma.group.findMany()

        return res.status(200).json(group)

    } catch (err) {
        return res.status(400).json({ error: err })
    }
}

async function deleteGroup(req: Request, res: Response) {
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
}

export {
    createGroup,
    getAllGroups,
    deleteGroup,
}
