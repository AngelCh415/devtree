import mongoose, { Schema } from "mongoose"

export interface IUser {
    name: string
    email: string
    password: string
}
// Define the User schema
const userSchema = new Schema({
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
    },
    password: {
        type: String,
        require: true,
        trim: true,
    },
})

// Generics use
const User = mongoose.model<IUser>("User", userSchema)
export default User
