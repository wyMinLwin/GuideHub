import { NextRequest, NextResponse } from 'next/server'
import clientPromise from '../../../lib/mongodb'
import { MongoClient } from 'mongodb'


export async function GET(req: NextRequest, res: NextResponse) {
    const client: MongoClient = await clientPromise
    const db = client.db('guide-hub')

    try {
        const allTasks = await db.collection('tasks').find({}).toArray()
        return NextResponse.json({ status: 200, data: allTasks })
    } catch (error) {
        console.error(error)
    }
}
