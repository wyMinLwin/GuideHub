import jwt, { JwtPayload } from 'jsonwebtoken'
import { getCookies } from 'next-client-cookies/server'
import { NextResponse } from 'next/server'

export async function getUserIdFromToken() {
    const token = getCookies().get('guide-hub-token')

    if (!token) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const jwtSecret = process.env.SECRET ?? ''
    const decodedToken = jwt.verify(token, jwtSecret) as JwtPayload

    if (!decodedToken || typeof decodedToken.id !== 'string') {
        return NextResponse.json(
            { error: 'Invalid token format' },
            { status: 401 }
        )
    }

    return decodedToken.id
}
