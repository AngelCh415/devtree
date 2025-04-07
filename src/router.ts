import { Router } from 'express'
import { body } from 'express-validator'
import { createAccount } from './handlers'

const router = Router()

// Routing - Get
router.post('/auth/register',
    body('handle').notEmpty().withMessage('Handle must not be empty'),
    body('name').notEmpty().withMessage('Name must not be empty'),
    body('email').isEmail().withMessage('Email must be valid'),
    body('password').isLength({ min: 8 }).withMessage('Password must be at least 8 characters'),
    createAccount)

export default router