import { Router } from 'express'
import { body } from 'express-validator'
import { createAccount, getUser, login, updateProfile } from './handlers'
import { handleInputErrors } from './middleware/validation'
import { checkAuth } from './middleware/auth'

const router = Router()

// Routing - Get
router.post('/auth/register',
    body('handle').notEmpty().withMessage('Handle must not be empty'),
    body('name').notEmpty().withMessage('Name must not be empty'),
    body('email').isEmail().withMessage('Email must be valid'),
    body('password').isLength({ min: 8 }).withMessage('Password must be at least 8 characters'),
    handleInputErrors,
    createAccount)

// Routing - Post
router.post('/auth/login',
    body('email').isEmail().withMessage('Email must be valid'),
    body('password').notEmpty().withMessage('Password must not be empty'),
    handleInputErrors,
    login
)

// Routing - Get
router.get('/user', checkAuth, getUser)
// Routing - Patch
router.patch('/user', 
    body('handle').notEmpty().withMessage('Handle must not be empty'),
    body('description').notEmpty().withMessage('Description must not be empty'),
    handleInputErrors,
    checkAuth, 
    updateProfile)

export default router