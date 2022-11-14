import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
import { createPasswordHash } from "../services/authService";

const prisma = new PrismaClient()

async function createUser(req: Request, res: Response) {

    const { name, email, password, role } = req.body

    const passwordHash = await createPasswordHash(password)

    try {
        const user = await prisma.user.create({
            data: {
                name,
                email,
                passwordHash,
                role
            }
        })

        return res.status(200).json({ user })
    } catch (err) {
        return res.status(400).json({ error: err });
    }
}

async function getAllUsers(req: Request, res: Response) {
    try {
        const user = await prisma.user.findMany()
        return res.status(200).json(user);
    } catch (err) {
        return res.status(400).json({ error: err })
    }
}

async function getOneUser(req: Request, res: Response) {
    try {
        const id = req.params.id;

        const user = await prisma.user.findUnique({
            where: { id }
        })

        return res.status(200).json(user);

    } catch (err) {
        return res.status(400).json({ error: err })
    }
}

export {
    createUser,
    getAllUsers,
    getOneUser
};
