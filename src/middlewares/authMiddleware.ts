//import { User } from "@prisma/client";
import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

const autConfig = process.env.SECRET as string;

function authMiddleware(req: Request, res: Response, next: NextFunction) {
    const authHeader = req.headers.authorization;

    if (!authHeader)
        return res.status(401).json({ error: 'Token is required' })

    const parts = authHeader.split(' ');

    if (Number(!parts.length) == 2)
        return res.status(401).json({ error: 'Token error' })

    const [scheme, token] = parts;

    if (!/^Bearer$/i.test(scheme))
        return res.status(401).json({ error: 'Token malformatted' })

    jwt.verify(token, autConfig, (err, decoded) => {
        if (err) return res.status(401).json({ error: 'Token invalid' })

        //fix interface decoded
        req.user = (<any>decoded).id;
        //req.user = decoded.id;
        return next();
    });
}

export default (
    authMiddleware
)