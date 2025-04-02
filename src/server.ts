import express from 'express' // ESM Ecamascript Module
import router from './router' // Import the router module

// Initialize the express application
const app = express()

// Code thart use all routes
app.use('/', router)

export default app