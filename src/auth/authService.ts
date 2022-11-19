import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import Jwt from "jsonwebtoken";
import { saveToken } from "../token/tokenService";

const prisma = new PrismaClient()

async function createPasswordHash(password: string) {
    return bcrypt.hash(password, 8)
}

async function checkPassword(passwordHash: string, password: string) {
    return bcrypt.compare(password, passwordHash)
}

async function validateUser(email: string, password: string) {
    const user = await prisma.user.findUnique({
        where: {
            email
        }
    })
    if (user && await checkPassword(user.passwordHash, password)) {
        const { passwordHash, ...result } = user;
        return result
    }
    return null;
}

async function login(user: any) {
    const payload = { email: user.email, id: user.id }
    const secret = process.env.SECRET as string;
    const token = await Jwt.sign(payload, secret, {
        expiresIn: "1d"
    })

    saveToken(token, user.email)

    return token

}

export {
    createPasswordHash,
    checkPassword,
    login,
    validateUser,

};

