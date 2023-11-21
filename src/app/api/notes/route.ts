import { NextRequest, NextResponse } from 'next/server'
import clientPromise from '../../../lib/mongodb'
import { MongoClient, ObjectId } from 'mongodb'
import { getUserIdFromToken } from '@/utils/auth'
import Note from '@/models/Note'

export async function GET(req: NextRequest) {
    try {
        const userId = await getUserIdFromToken(req) as string
        const client: MongoClient = await clientPromise
        const db = client.db(process.env.DB_NAME)

        const user = new ObjectId(userId)
        const allNotes = await db
            .collection('notes')
            .find({ user })
            .sort({ updatedAt: -1 })
            .toArray()

        return NextResponse.json(allNotes)
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
        const { title, body: noteBody } = body

        if (!title || !noteBody) {
            return NextResponse.json(
                { error: 'Title and body are required fields' },
                { status: 400 }
            )
        }

        const note = new Note({
            title,
            body: noteBody,
            user: userId,
        })

        await db.collection('notes').insertOne(note)

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

        const newNote = await db
            .collection('notes')
            .findOneAndUpdate(filter, updateDocument, {
                returnDocument: 'after',
            })

        return NextResponse.json(newNote)
    } catch (error) {
        console.error(error)
        return NextResponse.json({ error }, { status: 500 })
    }
}

export async function DELETE(req: NextRequest) {
    try {
        const client: MongoClient = await clientPromise
        const db = client.db(process.env.DB_NAME)

        const { _id } = await req.json()
        const filter = { _id: new ObjectId(_id) }

        await db.collection('notes').findOneAndDelete(filter)

        return new Response(null, {
            status: 204,
        })
    } catch (error) {
        console.error(error)
        return NextResponse.json({ error }, { status: 500 })
    }
}
