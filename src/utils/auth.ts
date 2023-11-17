import jwt, { JwtPayload } from 'jsonwebtoken'
import { NextRequest, NextResponse } from 'next/server'

export async function getUserIdFromToken(req: NextRequest) {
    const token = req.cookies.get('guide-hub-token')?.value

    if (!token) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const jwtSecret = process.env.SECRET ?? ''
    const decodedToken = jwt.verify(token, jwtSecret) as JwtPayload; 

    if (!decodedToken || typeof decodedToken.id !== 'string') {
        return NextResponse.json({ error: 'Invalid token format' }, { status: 401 });
    }

    return decodedToken.id
}
