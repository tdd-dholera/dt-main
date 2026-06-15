// app/api/redirects/route.js
import { getRedirects } from '@/lib/sanity.redirects'
import { NextResponse } from 'next/server'

export const revalidate = 60 // ISR every 60s

export async function GET() {
  const redirects = await getRedirects()
  return NextResponse.json(redirects)
}