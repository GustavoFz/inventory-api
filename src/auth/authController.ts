import { Request, Response } from 'express';
import { refreshToken } from '../token/tokenService';
import { login, validateUser } from './authService';

async function loginAuth(req: Request, res: Response) {
    const { email, password } = req.body;
    const user = await validateUser(email, password)

    if (user === null) {
        return res.status(401).json({ error: "User or password incorrect" });
    }

    const token = await login(user)

    return res.status(200).json({
        token: token,
        user: {
            email: user.email,
            name: user.name,
        }
    })
}

async function refreshAuth(req: Request, res: Response) {
    const { oldToken } = req.body
    const newToken = await refreshToken(oldToken)

    return res.status(200).json({ newToken })
}

export {
    loginAuth,
    refreshAuth,
};
