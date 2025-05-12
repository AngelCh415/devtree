import mongoose, { Schema } from "mongoose"

export interface IUser {
    handle: string
    name: string
    email: string
    password: string
    description: string
}
// Define the User schema
const userSchema = new Schema({
    handle: {
        type: String,
        require: true,
        trim: true,
        unique: true,
        lowercase: true,
    },
    name: {
        type: String,
        require: true,
        trim: true,
    },
    email: {
        type: String,
        require: true,
        unique: true,
        trim: true,
        lowercase: true,
    },
    password: {
        type: String,
        require: true,
        trim: true,
    },
    description: {
        type: String,
        default: '',      
    },
})

// Generics use
const User = mongoose.model<IUser>("User", userSchema)
export default User
