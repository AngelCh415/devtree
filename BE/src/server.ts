import express from 'express' // ESM Ecamascript Module
import 'dotenv/config' // Load environment variables from .env file
import router from './router' // Import the router module
import { connectDB } from './config/db'

// Initialize the express application
const app = express()
connectDB() // Connect to the database

// Read data of forms
app.use(express.json())

// Code thart use all routes
app.use('/', router)

export default app