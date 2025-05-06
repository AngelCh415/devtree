import express from 'express' // ESM Ecamascript Module
import cors from 'cors' // Import CORS middleware
import 'dotenv/config' // Load environment variables from .env file
import router from './router' // Import the router module
import { connectDB } from './config/db'
import { corsConfig } from './config/cors'

connectDB() // Connect to the database

// Initialize the express application
const app = express()

app.use(cors(corsConfig)) // Use CORS middleware with the specified configuration

// Read data of forms
app.use(express.json())

// Code thart use all routes
app.use('/', router)

export default app