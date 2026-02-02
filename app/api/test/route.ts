import axios from 'axios'
import https from 'https'
import { NextResponse } from 'next/server'

export async function GET() {
    return NextResponse.json({ message: 'Hello' })
}
