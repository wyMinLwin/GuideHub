import { NextRequest, NextResponse } from 'next/server'
import clientPromise from '../../../lib/mongodb'
import { MongoClient, ObjectId } from 'mongodb'

export async function GET() {
    try {
        const client: MongoClient = await clientPromise
        const db = client.db('guide-hub')

        const allBudgets = await db.collection('budgets').find({}).toArray()

        return NextResponse.json(allBudgets)
    } catch (error) {
        return NextResponse.json(null, { status: 500 })
    }
}

export async function POST(req: NextRequest) {
    try {
        const client: MongoClient = await clientPromise
        const db = client.db('guide-hub')

        const body = await req.json()
        await db.collection('budgets').insertOne(body)

        return NextResponse.json({ success: true }, { status: 201 })
    } catch (error) {
        return NextResponse.json(null, { status: 500 })
    }
}

export async function PUT(req: NextRequest) {
    try {
        const client: MongoClient = await clientPromise
        const db = client.db('guide-hub')

        const { id, ...body } = await req.json()
        const objectId = new ObjectId(id)
        const filter = { _id: objectId }

        const updatedBudget = await db
            .collection('budgets')
            .findOneAndReplace(filter, body, {
                returnDocument: 'after',
            })

        return NextResponse.json(updatedBudget)
    } catch (error) {
        console.error(error)
        return NextResponse.json({ error }, { status: 500 })
    }
}

export async function DELETE(req: NextRequest) {
    try {
        const client: MongoClient = await clientPromise
        const db = client.db('guide-hub')

        const id = await req.json()
        const objectId = new ObjectId(id)
        const filter = { _id: objectId }

        await db.collection('budgets').findOneAndDelete(filter)

        return new Response(null, {
            status: 204,
        })
    } catch (error) {
        console.error(error)
        return NextResponse.json({ error }, { status: 500 })
    }
}
