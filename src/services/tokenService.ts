import { PrismaClient } from "@prisma/client";
import { login } from "./authService";

const prisma = new PrismaClient()

async function saveToken(token: string, email: string) {

    const oldToken = await prisma.token.findFirst({
        where: {
            email
        }
    })

    if (!oldToken) {
        await prisma.token.create({
            data: {
                email,
                token
            }
        })
    } else {
        await prisma.token.update({
            where: {
                id: oldToken.id,
            },
            data: {
                token
            }
        })
    }
}

async function refreshToken(oldToken: string) {

    const token = await prisma.token.findFirst({
        where: {
            token: oldToken
        }
    })

    if (!token) {
        return { error: "token invalid" }
    }

    const user = await prisma.user.findFirst({
        where: {
            email: token.email
        }
    })

    return login(user)
}
export {
    saveToken,
    refreshToken,
};
