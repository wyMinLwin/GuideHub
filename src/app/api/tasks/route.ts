import { NextRequest, NextResponse } from 'next/server'
import clientPromise from '@/lib/mongodb'
import { MongoClient, ObjectId } from 'mongodb'
import Task from '@/models/Task'
import { getUserIdFromToken } from '@/utils/auth'

export async function GET(req: NextRequest) {
    try {
        const userId = await getUserIdFromToken(req) as string
        const client: MongoClient = await clientPromise
        const db = client.db(process.env.DB_NAME)

        const user = new ObjectId(userId)
        const allTasks = await db
            .collection('tasks')
            .find({ user })
            .sort({ updatedAt: -1 })
            .toArray()

        return NextResponse.json(allTasks)
    } catch (error) {
        return NextResponse.json(null, { status: 500 })
    }
}

export async function POST(req: NextRequest) {
    try {
        const userId = await getUserIdFromToken(req)
        const client: MongoClient = await clientPromise
        const db = client.db(process.env.DB_NAME)

        const body = await req.json()
        const { title, body: taskBody } = body

        if (!title || !taskBody) {
            return NextResponse.json(
                { error: 'Title and body are required fields' },
                { status: 400 }
            )
        }

        const task = new Task({
            title,
            body: taskBody,
            status: 'todo',
            user: userId,
        })

        await db.collection('tasks').insertOne(task)

        return NextResponse.json({ success: true }, { status: 201 })
    } catch (error) {
        return NextResponse.json(null, { status: 500 })
    }
}

export async function PUT(req: NextRequest) {
    try {
        await getUserIdFromToken(req)
        const client: MongoClient = await clientPromise
        const db = client.db(process.env.DB_NAME)

        const { _id, user, createdAt, ...body } = await req.json()
        const filter = { _id: new ObjectId(_id) }

        body.updatedAt = new Date();
        const updateDocument = { $set: body };

        const newTask = await db
            .collection('tasks')
            .findOneAndUpdate(filter, updateDocument, {
                returnDocument: 'after',
            })

        return NextResponse.json(newTask)
    } catch (error) {
        console.error(error)
        return NextResponse.json({ error }, { status: 500 })
    }
}

export async function DELETE(req: NextRequest) {
    try {
        await getUserIdFromToken(req)
        const client: MongoClient = await clientPromise
        const db = client.db(process.env.DB_NAME)

        const { _id }= await req.json()
        const filter = { _id: new ObjectId(_id) }

        await db.collection('tasks').findOneAndDelete(filter)

        return new Response(null, {
            status: 204,
        })
    } catch (error) {
        console.error(error)
        return NextResponse.json({ error }, { status: 500 })
    }
}
