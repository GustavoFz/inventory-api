import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
import { createPasswordHash } from "../auth/authService";

const prisma = new PrismaClient()

async function createUser(req: Request, res: Response) {

    const { name, email, password, role } = req.body

    const passwordHash = await createPasswordHash(password)
    const user = await prisma.user.create({
        data: {
            name,
            email,
            passwordHash,
            role
        }
    })

    return res.status(200).json({ user })
}

async function deleteUser(req: Request, res: Response) {

    const { id } = req.params
    await prisma.user.delete({
        where: { id }
    })
    return res.status(200).json({ message: "User deleted" })
}

async function getAllUsers(req: Request, res: Response) {
    const user = await prisma.user.findMany()
    return res.status(200).json(user);
}

async function getOneUser(req: Request, res: Response) {
    const { id } = req.params

    const user = await prisma.user.findUnique({
        where: { id }
    })

    return res.status(200).json(user);
}

async function getUserByToken(req: Request, res: Response) {
    const { token } = req.params

    const userToken = await prisma.token.findFirst({
        where: { token }
    })
    if (userToken) {
        const user = await prisma.user.findUnique({
            where: { email: userToken.email }
        })
        if (user) {
            const { passwordHash, ...result } = user;
            return res.status(200).json(result);
        }
    }
    return res.status(400).json({ error: 'Token does not exist' });
}

export {
    createUser,
    getAllUsers,
    getOneUser,
    getUserByToken,
    deleteUser
};
