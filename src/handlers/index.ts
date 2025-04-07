import type{ Request, Response } from 'express'
import { validationResult } from 'express-validator'
import slug from 'slug'
import User from "../models/User"
import { hashPassword } from '../utils/auth'

export const createAccount = async (req: Request, res: Response) => {
    // Errors control
    let errors = validationResult(req)
    if(!errors.isEmpty()){
        res.status(400).json({
            errors: errors.array(),
        })
    }
    const {email, password} = req.body
    // FindOne == where with one coincidence
    const userExists = await User.findOne({email})   
    if(userExists) {
        res.status(409).json({
            message: 'User already exists',
        })
    }else {
        const user = new User(req.body)
        const handle = slug(req.body.handle,'')
        const handleExists = await User.findOne({handle})
        if(handleExists) {
            res.status(409).json({
                message: 'Handle not available',
            })
        }
        user.password = await hashPassword(password)
        user.handle = handle
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