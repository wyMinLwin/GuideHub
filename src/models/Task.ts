import mongoose, { ObjectId } from 'mongoose'
import { TaskStatus } from '@/shared/types/TaskStatus'

export interface Tasks extends mongoose.Document {
    title: string
    body: string
    status: string
    user: ObjectId
}

const taskSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    body: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        required: true,
        enum: ['done', 'in progress', 'todo'] as TaskStatus[],
        default: 'todo',
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    updatedAt: {
        type: Date,
        default: Date.now,
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
})

export default mongoose.models.Task || mongoose.model<Tasks>('Task', taskSchema)
