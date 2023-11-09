import { NextRequest, NextResponse } from 'next/server'
import clientPromise from '@/lib/mongodb'
import { MongoClient } from 'mongodb'
import bcrypt from 'bcrypt'

export async function POST(req: NextRequest) {
    try {
        const client: MongoClient = await clientPromise
        const db = client.db(process.env.DB_NAME)
        const userDb = db.collection('users')

        const body = await req.json()

        const existingUser = await userDb.findOne({ email: body.email })

        if (existingUser) {
            return NextResponse.json({ error: "A user with the provided email already exists." }, { status: 400 })
        }

        const saltRounds = 10
        const passwordHash = await bcrypt.hash(body.password, saltRounds)

        const user = {
            email: body.email,
            password: passwordHash,
        }

        await userDb.insertOne(user)

        return NextResponse.json({ success: true }, { status: 201 })
    } catch (error) {
        console.log(error)
        return NextResponse.json(null, { status: 500 })
    }
}
