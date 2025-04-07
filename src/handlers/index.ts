import type{ Request, Response } from 'express'
import User from "../models/User"
import { hashPassword } from '../utils/auth'

export const createAccount = async (req: Request, res: Response) => {
    
    const {email, password} = req.body
    // FindOne == where with one coincidence
    const userExists = await User.findOne({email})   
    if(userExists) {
        res.status(409).json({
            message: 'User already exists',
        })
    }else {
        const user = new User(req.body)
        user.password = await hashPassword(password)
        await user.save()

        /*
        Other way to create a user
             await User.create(req.body)
        */
        res.status(201).json({
            message: 'User created successfully',
        })
    }
}