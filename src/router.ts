import {Router} from 'express'

const router = Router()

// Routing - Get
router.post('/auth/register', (req, res) => {
    console.log(req.body)
    res.status(200).json({
        message: 'User registered successfully',
        user: req.body
    })
})

export default router