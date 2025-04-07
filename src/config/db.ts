import mongoose from 'mongoose'


export const connectDB = async () => {
    try {
        // Connect to MongoDB using Mongoose
        const connection = await mongoose.connect(process.env.MONGO_URI)
        const url = `${connection.connection.host}:${connection.connection.port}`

        console.log('MongoDB connection successful in ', url)
    } catch (error) {
        console.error('MongoDB connection error:', error.message)
        process.exit(1) // Exit the process with failure
    }
}