import mongoose, { ObjectId } from 'mongoose'

export interface Notes extends mongoose.Document {
    title: string
    body: string
    user: ObjectId
}

const noteSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    body: {
        type: String,
        required: true,
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
})

export default mongoose.models.Note || mongoose.model<Notes>('Note', noteSchema)
