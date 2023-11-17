import mongoose from "mongoose"

export interface Users extends mongoose.Document {
    name: string
    email: string
    password: string
}

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
    },
    email: {
        type: String,
        unique: true
    },
    password: String,
})

export default mongoose.models.User || mongoose.model<Users>('User', userSchema)
