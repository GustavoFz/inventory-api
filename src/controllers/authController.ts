import { Request, Response } from 'express';
import { login, validateUser } from '../services/authService';
import { refreshToken } from '../services/tokenService';

async function loginAuth(req: Request, res: Response) {
    const { email, password } = req.body;

    try {

        const user = await validateUser(email, password)

        if (user === null) {
            return res.status(401).json({ error: "User or password incorrect" });
        }

        const token = await login(user)

        return res.status(200).json({ token })

    } catch (err) {
        return res.status(400).json({ error: err });
    }
}

async function refreshAuth(req: Request, res: Response) {
    const { oldToken } = req.body

    try {
        const newToken = await refreshToken(oldToken)

        return res.status(200).json({ newToken })
    } catch (err) {
        return res.status(400).json({ error: err });
    }


}

export {
    loginAuth,
    refreshAuth,
};
