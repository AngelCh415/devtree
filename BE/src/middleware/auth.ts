import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken'
import User, { IUser } from "../models/User"

declare global {
    namespace Express {
        interface Request {
            user?: IUser
        }
    }
}

export const checkAuth = async (req: Request, res: Response, next: NextFunction) => {
    const bearer = req.headers.authorization
    if (!bearer) {
        res.status(401).json({
            message: 'Unauthorized',
        })
    }
    const [, token] = bearer.split(' ')

    if(!token) {
        res.status(401).json({
            message: 'Unauthorized',
        })
    }

    try{
        const result = jwt.verify(token, process.env.JWT_SECRET )
        if(typeof result === 'object' && result.id){
            const user = await User.findById(result.id)
            if(!user){
                res.status(404).json({
                    message: 'User not found',
                })
            }
            req.user = user
            next()
        }

    }catch (error){

        res.status(500).json({
            error: 'Token invalid',
        })
    }
}