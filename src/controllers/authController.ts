import { PrismaClient } from '@prisma/client';
import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { checkPassword } from '../services/authService';

const prisma = new PrismaClient()

const secret = process.env.SECRET as string

async function login(req: Request, res: Response) {
    const { email, password } = req.body;

    try {
        const user = await prisma.user.findUnique({
            where: {
                email
            }
        })

        if (!user || !checkPassword(user, password)) {
            return res.status(401).json({ error: "User or password incorrect" });
        }

        const payload = {
            id: user.id,
            email: user.email
        }

        const token = jwt.sign(payload, secret, {
            expiresIn: "1d"
        })

        await prisma.refreshToken.create({
            data: {
                email,
                token
            }
        })

        return res.status(200).json({
            user: {
                id: user.id,
                email: user.email,
            },
            token
        })
    } catch (err) {
        return res.status(400).json({ error: err });
    }
}

async function refreshToken(req: Request, res: Response) {
    const { oldToken, email } = req.body

    const refreshToken = await prisma.refreshToken.findFirst({
        where: {
            token: oldToken,
            email: email
        }
    })

    if (!refreshToken) {
        return res.status(400).json({ error: "token invalid" })
    }

    await prisma.refreshToken.update({
        where: {
            id: refreshToken.id
        },
        data: {
            token: oldToken
        }

    })
}



export {
    login
};
