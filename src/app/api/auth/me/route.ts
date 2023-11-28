import { NextRequest, NextResponse } from 'next/server'
import { MongoClient, ObjectId } from 'mongodb'
import { getUserIdFromToken } from '@/utils/auth'
import clientPromise from '@/lib/mongodb'

export async function GET(req: NextRequest) {
    try {
        const userId = (await getUserIdFromToken(req)) as string
        const client: MongoClient = await clientPromise
        const db = client.db(process.env.DB_NAME)

        const existingUser = await db
            .collection('users')
            .findOne({ _id: new ObjectId(userId) })

        if (!existingUser) {
            return NextResponse.json(
                {
                    message: `User with respective token id doesn't exist in database`,
                },
                { status: 404 }
            )
        }

        const { password, ...user } = existingUser

        return NextResponse.json(user)
    } catch (error) {
        return NextResponse.json(null, { status: 500 })
    }
}
