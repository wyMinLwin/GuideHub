import { NextRequest, NextResponse } from 'next/server'
import clientPromise from '../../../lib/mongodb'
import { MongoClient, ObjectId } from 'mongodb'

export async function GET() {
    try {
        const client: MongoClient = await clientPromise
        const db = client.db(process.env.DB_NAME)

        const allNotes = await db.collection('notes').find({}).toArray()

        return NextResponse.json(allNotes)
    } catch (error) {
        return NextResponse.json(null, { status: 500 })
    }
}

export async function POST(req: NextRequest) {
    try {
        const client: MongoClient = await clientPromise
        const db = client.db(process.env.DB_NAME)

        const body = await req.json()
        await db.collection('notes').insertOne(body)

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

        const newNote = await db
            .collection('notes')
            .findOneAndReplace(filter, body, {
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

        const id = await req.json()
        const objectId = new ObjectId(id)
        const filter = { _id: objectId }

        await db.collection('notes').findOneAndDelete(filter)

        return new Response(null, {
            status: 204,
        })
    } catch (error) {
        console.error(error)
        return NextResponse.json({ error }, { status: 500 })
    }
}
