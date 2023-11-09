import { NextRequest, NextResponse } from 'next/server'
import clientPromise from '../../../lib/mongodb'
import { MongoClient, ObjectId } from 'mongodb'

export async function GET() {
    try {
        const client: MongoClient = await clientPromise
        const db = client.db(process.env.DB_NAME)

        const allTasks = await db.collection('tasks').find({}).toArray()

        return NextResponse.json(allTasks)
    } catch (error) {
        return NextResponse.json(null, { status: 500 })
    }
}

export async function POST(req: NextRequest) {
    try {
        const client: MongoClient = await clientPromise
        const db = client.db(process.env.DB_NAME)

        const body = await req.json()
        await db.collection('tasks').insertOne(body)

        return NextResponse.json({ success: true }, { status: 201 })
    } catch (error) {
        return NextResponse.json(null, { status: 500 })
    }
}

export async function PUT(req: NextRequest) {
    try {
        const client: MongoClient = await clientPromise
        const db = client.db(process.env.DB_NAME)

        const { id, ...body } = await req.json()
        const objectId = new ObjectId(id)
        const filter = { _id: objectId }

        const newTask = await db
            .collection('tasks')
            .findOneAndReplace(filter, body, {
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
        const client: MongoClient = await clientPromise
        const db = client.db(process.env.DB_NAME)

        const id = await req.json()
        const objectId = new ObjectId(id)
        const filter = { _id: objectId }

        await db.collection('tasks').findOneAndDelete(filter)

        return new Response(null, {
            status: 204,
        })
    } catch (error) {
        console.error(error)
        return NextResponse.json({ error }, { status: 500 })
    }
}
