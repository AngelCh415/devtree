import type { Request, Response } from 'express'
import slug from 'slug'
import formidable from 'formidable'
import User from "../models/User"
import { checkPassword, hashPassword } from '../utils/auth'
import { generateJWT } from '../utils/jwt'
import cloudinary from '../config/cloudinary'

export const createAccount = async (req: Request, res: Response) => {
    const { email, password } = req.body
    // FindOne == where with one coincidence
    const userExists = await User.findOne({ email })
    if (userExists) {
        res.status(409).json({
            message: 'User already exists',
        })
    } else {
        const user = new User(req.body)
        const handle = slug(req.body.handle, '')
        const handleExists = await User.findOne({ handle })
        if (handleExists) {
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

export const login = async (req: Request, res: Response) => {
    const { email, password } = req.body
    // FindOne == where with one coincidence
    const user = await User.findOne({ email })
    if (!user) {
        res.status(404).json({
            message: 'User does not exists',
        })
    }
    // Check Password
    const passwordCorrect = await checkPassword(password, user.password)
    if (!passwordCorrect) {
        res.status(401).json({
            message: 'Password incorrect',
        })
    }
    else {
        // Generate JWT

        const token = generateJWT({id: user._id})
        res.status(200).json({
            message: 'User logged in successfully',
            token,
        })
    }
}

export const getUser = async (req: Request, res: Response) => {
    res.json(req.user)
}

export const updateProfile = async (req: Request, res: Response) => {
    try{
        const {description} = req.body
        const handle = slug(req.body.handle, '')
        const handleExists = await User.findOne({ handle })
        if (handleExists && handleExists.email !== req.user.email) {
            res.status(409).json({
                message: 'Handle not available',
            })
        }

        // Update user
        req.user.description = description
        req.user.handle = handle
        await req.user.save()
        res.status(200).json({
            message: 'Profile updated successfully',
        })

    }catch (e) {
        const error = new Error('Error updating profile')
        res.status(500).json({
            message: error.message,
        })
    }
}

export const uploadImage = async (req: Request, res: Response) => {
    const form = formidable({ multiples: false})
   
    try{
        form.parse(req, (error, fields, files)=> {
            cloudinary.uploader.upload(files.file[0].filepath, {}, 
                async function(error, result) {
                    if (error){
                        const error = new Error('Error uploading image')
                        return res.status(500).json({
                            message: error.message,
                        })
                    }
                    if (result){
                        console.log(result.secure_url)
                    }
            })
        })
    }catch (e) {
        const error = new Error('Error updating image profile')
        res.status(500).json({
            message: error.message,
        })
    }
}