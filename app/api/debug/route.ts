import { NextResponse } from 'next/server'

export async function GET() {
  return NextResponse.json({
    supabase_url:  process.env.NEXT_PUBLIC_SUPABASE_URL ? '✅ configurado' : '❌ ausente',
    supabase_anon: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ? '✅ configurado' : '❌ ausente',
    whatsapp:      process.env.NEXT_PUBLIC_WHATSAPP ?? '❌ ausente',
  })
}
