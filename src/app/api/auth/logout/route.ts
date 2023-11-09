import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'

export async function POST() {
    try {
        cookies().delete('guide-hub-token')

        return NextResponse.json({ success: true }, { status: 201 })
    } catch (error) {
        console.log(error)
        return NextResponse.json(null, { status: 500 })
    }
}
