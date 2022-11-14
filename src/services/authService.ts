import { PrismaClient, User } from "@prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient()

async function createPasswordHash(password: string) {
    return bcrypt.hash(password, 8)
}

async function checkPassword(user: User, password: string) {
    return bcrypt.compare(password, user.passwordHash)
}

async function validateUser(email: string, password: string) {
    const user = await prisma.user.findUnique({
        where: {
            email
        }
    })

    if (user && await checkPassword(user, password)) {

        const { passwordHash, ...result } = user;
        return result
    }

    return null;
}

export {
    createPasswordHash,
    checkPassword

};

